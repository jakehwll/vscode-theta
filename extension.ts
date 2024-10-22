import * as vscode from "vscode";
import * as path from "path";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join("out", "server", "server.js")
  );

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "theta" }],
    synchronize: {
      configurationSection: "thetaLanguageServer",
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.theta"),
    },
  };

  client = new LanguageClient(
    "thetaLanguageServer",
    "Theta Language Server",
    serverOptions,
    clientOptions
  );

  client.start().then(() => {
    vscode.window.showInformationMessage("Theta Language Server started");
    client.onNotification("custom/notification", (params) => {
      vscode.window.showInformationMessage(params.message);
    });
  });

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.startThetaLanguageServer",
      () => {
        if (client.isRunning()) {
          vscode.window.showInformationMessage(
            "Theta Language Server is already running"
          );
        } else {
          vscode.window.showInformationMessage(
            "Starting Theta Language Server..."
          );
          client.start().then(() => {
            vscode.window.showInformationMessage(
              "Theta Language Server started"
            );
          });
        }
      }
    )
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

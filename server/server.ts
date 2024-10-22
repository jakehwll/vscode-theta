import {
  createConnection,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  CompletionItem,
  CompletionItemKind,
  TextDocuments,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments<TextDocument>({
  create: TextDocument.create,
  update: TextDocument.update,
});

const types: CompletionItem[] = [
  {
    label: "Bool",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for Boolean",
  },
  {
    label: "Bytes",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for bytes",
  },
  {
    label: "Int",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for integers",
  },
  {
    label: "Long",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for long integers",
  },
  {
    label: "Float",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for floating-point numbers",
  },
  {
    label: "Double",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for double precision",
  },
  {
    label: "String",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for strings",
  },
  {
    label: "Date",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for dates",
  },
  {
    label: "Datetime",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for date and time",
  },
  {
    label: "UUID",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for UUIDs",
  },
  {
    label: "Time",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for time",
  },
  {
    label: "LocalDatetime",
    kind: CompletionItemKind.Text,
    detail: "Built-in type for local date and time",
  },
];

connection.onInitialize((params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [":"],
      },
    },
  };
});

connection.onCompletion((textDocumentPosition) => {
  return types;
});

connection.onCompletionResolve((item: CompletionItem) => {
  return item;
});

documents.onDidChangeContent((change) => {
  // TODO Implement logic for diagnostics or other features
});

connection.onDidChangeConfiguration((change) => {
  documents.all().forEach(validateTextDocument);
});

function validateTextDocument(textDocument: TextDocument): void {
  // TODO Implement your validation logic here
}

documents.listen(connection);
connection.listen();

import { createDocument } from "../src/vector";

// TODO: implement general-purpose CLI
const document = await createDocument("foo", {});

console.log("doc", document);

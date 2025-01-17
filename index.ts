import { nip19 } from "nostr-tools";

export default {
  async fetch(request: Request): Promise<Response> {
    const { pathname, searchParams } = new URL(request.url);
    const name = searchParams.get("name")!;
    if (
      pathname === "/.well-known/nostr.json" &&
      typeof name === "string" &&
      name.startsWith("npub")
    ) {
      return new Response(
        JSON.stringify({ names: { [name]: nip19.decode(name).data } })
      );
    }
    if (pathname === "/") {
      return Response.redirect("https://github.com/renzholy/nost-vip", 301);
    }
    return new Response(null, { status: 404 });
  },
};

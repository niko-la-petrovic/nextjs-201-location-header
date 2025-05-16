import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const accessControl = searchParams.get("accessControl");

  console.log("API route.ts", { accessControl });

  const location = accessControl
    ? "https://with_access_control"
    : "https://no_access_control";

  return Response.json(
    { prop1: "prop1", accessControl, location },
    {
      status: 201,
      headers: {
        Test: "Something",
        Location: location,
      },
    }
  );
}

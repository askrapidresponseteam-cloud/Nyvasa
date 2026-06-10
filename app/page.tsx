import { SHELL } from "@/app/shell";
import AppRuntime from "@/components/AppRuntime";

export default function Home() {
  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: SHELL }} />
      <AppRuntime />
    </>
  );
}

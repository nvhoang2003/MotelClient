import RootLayout from "./layout";
import ButtonAppBar from "./ui/app-bar";

IelttestPage.getLayout = (page) => <RootLayout>{page}</RootLayout>

export default function IelttestPage() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <ButtonAppBar></ButtonAppBar>
      <h1>Hello world</h1>
    </main>
  );
}

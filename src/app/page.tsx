import Image from "next/image";
import Header from "@/src/app/components/Header";
export default function Home() {
  return (
    <>
      <Header/>
      <div className="flex flex-col min-h-screen p-10 w-[80%] mx-auto shadow-2xl shadow-blue-500/50 text-2xl overflow-auto">
        <div id="news" className="h-[50%]">
          <h1>News</h1>
        </div>
        <div id="blogs" className="h-[50%]">
          <h1>Blogs</h1>
        </div>
      </div>
    </>
  );
}

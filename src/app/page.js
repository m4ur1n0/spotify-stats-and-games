// index page
import { LOGIN_URL } from "@/lib/spotify";


export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      yea!!
      <a
        href={LOGIN_URL}
        className='px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300'
      >
        Login!
      </a>
    </div>
  );
}

import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { ArrowRight } from "lucide-react";

export default function DemoOne() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-screen">
      <WebGLShader/> 
      <div className="relative border border-[#27272a] p-2 w-full mx-auto max-w-3xl z-10 backdrop-blur-sm bg-black/30 rounded-xl">
        <main className="relative border border-[#27272a] py-16 overflow-hidden rounded-lg">
          <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)] drop-shadow-md">
            Design is Everything
          </h1>
          <p className="text-white/80 px-6 text-center text-xs md:text-sm lg:text-lg max-w-xl mx-auto drop-shadow">
            Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
          </p>
          <div className="my-8 flex items-center justify-center gap-2 bg-black/40 w-fit mx-auto px-4 py-2 rounded-full border border-white/10">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-400 font-medium tracking-wide">Available for New Projects</p>
          </div>
          
          <div className="flex justify-center mt-10"> 
            <LiquidButton className="text-white border border-white/20 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md" size={'xl'}>
              Let's Go
              <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton> 
          </div> 
        </main>
      </div>
    </div>
  )
}

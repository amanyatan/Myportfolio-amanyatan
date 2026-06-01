import { RevealText } from "./ui/reveal-text";
import { motion } from "framer-motion";
import img1 from "../assets/Selected Works/LET'S TALK ASSETS/Beyonder, KH_ arts.jpg";
import img2 from "../assets/Selected Works/LET'S TALK ASSETS/Ichigo wallpaper 1.jpg";
import img3 from "../assets/Selected Works/LET'S TALK ASSETS/With or without a team I’m still gonna win.jpg";
import img4 from "../assets/Selected Works/LET'S TALK ASSETS/download (1).jpg";
import img5 from "../assets/Selected Works/LET'S TALK ASSETS/download (2).jpg";
import img6 from "../assets/Selected Works/LET'S TALK ASSETS/download (3).jpg";
import img7 from "../assets/Selected Works/LET'S TALK ASSETS/download (4).jpg";
import img8 from "../assets/Selected Works/LET'S TALK ASSETS/download.jpg";

const letterImages = [img1, img2, img3, img4, img5, img6, img7, img8];

export function Footer() {
  return (
    <footer className="w-full bg-black min-h-[80vh] flex items-center justify-center border-t border-white/5">
      <div className="w-full overflow-hidden flex justify-center">
        <RevealText 
          text="LET'S TALK"
          textColor="text-white"
          overlayColor="text-orange-500"
          fontSize="text-[clamp(60px,18vw,350px)]"
          letterDelay={0.06}
          overlayDelay={0.04}
          overlayDuration={0.4}
          springDuration={1000}
          letterImages={letterImages}
        />
      </div>
    </footer>
  );
}

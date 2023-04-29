await import("jimp/browser/lib/jimp.js");
import { size } from "lodash";
import { useEffect, useState } from "react";
import fontBlackPath from "../../../assets/open-sans-8-black.fnt?url"
import fontWhitePath from "../../../assets/open-sans-8-white.fnt?url"
import { PreImg } from "./AsciifyImage.styled";
import Jimp from "jimp";

const chars = ' .,:;i1tfLCG08@'
const num_c = chars.length - 1;

type Props = {
  src: string;
  style: string;
  width: number;
  height: number;
};

const AsciifyImage: React.FC<Props> = (props) => {
  const { Jimp } = window as typeof window & { Jimp: any };
  const options = props;
  const { src, style, width, height } = options;
  const [asciiImage, setImage] = useState(src);

  useEffect(() => {
    async function loadImage() {
      const image = await Jimp.read(src);
      // image.scale(0.3);
      // image.pixelate(10, 10);
      
      let ascii: string = "";
      const norm = (255 * 4 / num_c);

      let j, i, c = 0;
      for (j = 0; j < image.bitmap.height; j++) {
        for (i = 0; i < image.bitmap.width; i++) {

          const color = Jimp.intToRGBA(image.getPixelColor(i, j));
          const intensity = color.r + color.g + color.b + color.a;


          const next = chars.charAt(Math.round(intensity / norm));
          ascii += next;
          if (c < num_c)
            c++;
          else
            c = 0;
        }
        if (j != image.bitmap.height - 1) ascii += '\n';
      }
      setImage(ascii);
      return;
    }
    loadImage();
  }, [src]);

  return (
    <PreImg>
      {asciiImage}
    </PreImg>
  );
}

export default AsciifyImage;
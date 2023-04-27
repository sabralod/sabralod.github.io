// import Jimp from "jimp/es";
await import("jimp/browser/lib/jimp.js");
import { useEffect, useState } from "react";
import { Img, PreImg } from "./HeroImage.styled";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: string;
  className: string;
  loadBlur: boolean;
}

const chars = ' .,:;i1tfLCG08@'
const num_c = chars.length - 1;

const HeroImage: React.FC<Props> = (props) => {
  const { Jimp } = window as typeof window & { Jimp: any };
  const options = props;
  const { src, alt, width, height, style, className, loadBlur } = options;
  const [image, setImage] = useState(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function imgEffect() {
      const loadImage = await Jimp.read(src);

      loadImage.resize(width, height);
      console.log(loadImage.bitmap.height);
      console.log(loadImage.bitmap.width);

      let ascii: string = "";
      const norm = (255 * 4 / num_c);

      let j, i, c;
      for (j = 0; j < loadImage.bitmap.height; j++) {
        for (i = 0; i < loadImage.bitmap.width; i++) {

          for (c = 0; c < 2; c++) {

            const color = Jimp.intToRGBA(loadImage.getPixelColor(i, j));
            const intensity = color.r + color.g + color.b + color.a;


            const next = chars.charAt(Math.round(intensity / norm));
            ascii += next;
          }

        }
        if (j != loadImage.bitmap.height - 1) ascii += '\n';
      }

      console.log(ascii);

      const mime = await loadImage.getBase64Async(Jimp.MIME_JPEG);
      setLoading(false);
      setImage(mime);
    }
    imgEffect();
    return () => setLoading(true);
  }, [src, options]);

  return (
    <PreImg>
      <Img
        className={className && className}
        alt={alt && alt}
        src={image}
        width={width && width}
        height={height && height}
        style={loading && loadBlur ? { filter: 'blur(10px)' } : style}
        />
    </PreImg>
  );
}
export default HeroImage;

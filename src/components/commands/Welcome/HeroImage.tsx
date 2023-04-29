// import Jimp from "jimp/es";
await import("jimp/browser/lib/jimp.js");
import { useEffect, useState } from "react";
import { PreImg } from "./HeroImage.styled";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: string;
  className: string;
  loadBlur: boolean;
}

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
      

      const mime = await loadImage.getBase64Async(Jimp.MIME_JPEG);
      setLoading(false);
      setImage(mime);
    }
    imgEffect();
    return () => setLoading(true);
  }, [src, options]);

  return (
    <PreImg>
      <img
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

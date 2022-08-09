import { useRef, useEffect } from "react"

export const FormCanvas = ({imageSrc}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wantedSize = canvas.width;

    const ctx = canvasRef.current.getContext("2d");

    const image = new Image();
    image.onload = () => {
      if (image.width > wantedSize || image.height > wantedSize) {

          const aspectRatioW = (image.width > image.height) ? 1 : image.width / image.height;
          const aspectRatioH = (image.width > image.height) ? image.height / image.width : 1;

          image.width = wantedSize * aspectRatioW;
          image.height = wantedSize * aspectRatioH;
      }

      canvas.width = image.width ;
      canvas.height = image.height ;
      
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    image.src = imageSrc;
  }, [imageSrc]);

  return (
    <canvas ref={canvasRef} className="mb-4"></canvas>
  )
}
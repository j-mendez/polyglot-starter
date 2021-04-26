const canvasLoader = (): string => `
      <canvas id="canvas" style="width: 100%; height: 100%; position: absolute; top: 0; bottom: 0; left: 0; right: 0; opacity: 0.1; z-index: -1;"></canvas>
      <script>

        const canvas = document.getElementById("canvas");
        const boundingRect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");

        const ratio  = window.devicePixelRatio || 1;
        const width  = (boundingRect.width  | 0) * ratio;
        const height = (boundingRect.height | 0) * ratio;
        const size = width * height;
        const byteSize = size << 1;

        canvas.width  = width;
        canvas.height = height;

        ctx.scale(ratio, ratio);

        const memory = new WebAssembly.Memory({ initial: ((byteSize + 0xffff) & ~0xffff) >>> 16 });
        const buffer = new Uint16Array(memory.buffer);
        const imageData = ctx.createImageData(width, height);
        const argb = new Uint32Array(imageData.data.buffer);

        var importObject = {
          env: {
            memory
          },
          Math,
        };

        WebAssembly.instantiateStreaming(fetch('/assets/visualizer.wasm'), importObject).then((obj) => {
          obj.instance.exports.update(width, height, 40);


          for (let y = 0; y < height; ++y) {
            const yx = y * width;
            for (let x = 0; x < width; ++x) {
              argb[yx + x] = colors[buffer[yx + x]];
            }
          }

          ctx.putImageData(imageData, 0, 0);
        });

        function computeColors() {
          const canvas = document.createElement("canvas");
          canvas.width = 2048;
          canvas.height = 1;
          const ctx = canvas.getContext("2d");
          const grd = ctx.createLinearGradient(0, 0, 2048, 0);
          grd.addColorStop(0.00, "#000764");
          grd.addColorStop(0.16, "#2068CB");
          grd.addColorStop(0.42, "#EDFFFF");
          grd.addColorStop(0.6425, "#FFAA00");
          grd.addColorStop(0.8575, "#000200");
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, 2048, 1);
          return new Uint32Array(ctx.getImageData(0, 0, 2048, 1).data.buffer);
        }

        const colors = computeColors();
      </script>
`

export { canvasLoader }

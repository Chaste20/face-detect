import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';




interface ExpressionAnalysisProps {
  stream: MediaStream | null;
}

const ExpressionAnalysis: React.FC<ExpressionAnalysisProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function startExpressionDetection() {
      if (stream && videoRef.current) {
        const model = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
        );

        videoRef.current.srcObject = stream;

        const detectExpressions = async () => {
          const faces = await model.estimateFaces({
            input: videoRef.current,
            predictIrises: false,
          });

          if (faces.length > 0) {
            // Process expressions for each detected face
            faces.forEach(() => {
              // Analyze face landmarks and determine expressions
            });
          }

          requestAnimationFrame(detectExpressions);
        };

        detectExpressions();
      }
    }

    startExpressionDetection();
  }, [stream]);

  return (
    <video ref={videoRef} autoPlay playsInline style={{ display: stream ? 'block' : 'none' }} />
  );
};

export default ExpressionAnalysis;


import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  title: string;
  thumbnail?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  thumbnail,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };
  
  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };
  
  const handleLoadedData = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  };

  return (
    <Card 
      className={cn("relative overflow-hidden group rounded-lg", className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {!isLoaded && thumbnail && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Button 
              size="icon" 
              className="h-16 w-16 rounded-full bg-bloom-purple/80 hover:bg-bloom-purple"
              onClick={togglePlay}
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        src={src}
        title={title}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onLoadedData={handleLoadedData}
      />
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-all duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="flex-1"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={togglePlay} 
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={toggleMute}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
            
            <div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={handleFullscreen}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;

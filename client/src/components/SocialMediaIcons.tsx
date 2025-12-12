import { Twitter, Instagram, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const showSocialMediaWarning = (e: React.MouseEvent) => {
  e.preventDefault();
  toast({
    title: "Akses Terbatas",
    description: "Hanya orang tertentu yang dapat melihat akun media sosial yang bersangkutan dengan project ini",
    variant: "warning",
  });
};

interface SocialMediaIconsProps {
  className?: string;
  variant?: "footer" | "sidebar";
}

export function SocialMediaIcons({ className = "", variant = "footer" }: SocialMediaIconsProps) {
  const baseClasses = variant === "sidebar" 
    ? "w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center cursor-pointer transition-colors"
    : "w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors";
  
  const iconSize = variant === "sidebar" ? "w-5 h-5" : "w-4 h-4";
  const gapClass = variant === "sidebar" ? "gap-3" : "gap-4";

  return (
    <div className={`flex ${gapClass} ${className}`}>
      <button
        onClick={showSocialMediaWarning}
        className={`${baseClasses} ${variant === "sidebar" ? "hover:bg-blue-500/20 hover:text-blue-400" : "hover:bg-white/10"}`}
        data-testid="social-twitter"
        aria-label="Twitter"
      >
        <Twitter className={iconSize} />
      </button>
      <button
        onClick={showSocialMediaWarning}
        className={`${baseClasses} ${variant === "sidebar" ? "hover:bg-pink-500/20 hover:text-pink-400" : "hover:bg-white/10"}`}
        data-testid="social-instagram"
        aria-label="Instagram"
      >
        <Instagram className={iconSize} />
      </button>
      <button
        onClick={showSocialMediaWarning}
        className={`${baseClasses} ${variant === "sidebar" ? "hover:bg-blue-500/20 hover:text-blue-400" : "hover:bg-white/10"}`}
        data-testid="social-linkedin"
        aria-label="LinkedIn"
      >
        <Linkedin className={iconSize} />
      </button>
    </div>
  );
}

interface SocialButtonProps {
  platform: "twitter" | "instagram" | "linkedin";
  className?: string;
}

export function SocialButton({ platform, className = "" }: SocialButtonProps) {
  const icons = {
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
  };
  
  const Icon = icons[platform];
  
  return (
    <button
      onClick={showSocialMediaWarning}
      className={`text-slate-500 hover:text-blue-400 transition-colors ${className}`}
      data-testid={`social-${platform}`}
      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

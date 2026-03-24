import {
  Award, Users, BookOpen, Trophy, Star, Calendar, ArrowRight, Target, Heart,
  Lightbulb, Shield, Globe, Microscope, Palette, Music, Calculator,
  GraduationCap, CheckCircle, Camera, Mail, Phone, MapPin, Clock,
  Facebook, Twitter, Instagram, Youtube, Send, Download, Share2, Play,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Award, Users, BookOpen, Trophy, Star, Calendar, ArrowRight, Target, Heart,
  Lightbulb, Shield, Globe, Microscope, Palette, Music, Calculator,
  GraduationCap, CheckCircle, Camera, Mail, Phone, MapPin, Clock,
  Facebook, Twitter, Instagram, Youtube, Send, Download, Share2, Play
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || BookOpen;
}

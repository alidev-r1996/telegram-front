import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getTimeFromDate(date){
  return new Date(date).toLocaleTimeString("en",{hourCycle: "h24", hour: "2-digit", minute: "2-digit"})
}

export function truncateText(text){
  if (text.length >=35){
    return text.slice(0,35) + '...';
  }else{
    return text
  }
}
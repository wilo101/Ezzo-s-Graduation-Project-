export interface AudioMetadata {
    fileName: string;
    fileSize: string;
    fileType: string;
    lastModified: string;
    duration: string;
    sampleRate: number;
    channels: number;
  }
  
  export interface AnalysisResult {
    isDeepfake: boolean;
    confidence: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    explanation: string;
    spectrogramAnalysis: string;
    consistencyScore: number;
    likelySource: string; // e.g., 'ElevenLabs', 'Real Recording'
    technicalAnomalies: string[];
    ipTrace?: string | null;
    softwareSignature?: string;
  }
  
  export interface ThreatReport {
    target: string;
    type: 'HASH' | 'IP';
    riskScore: number; // 0-100
    classification: string; // e.g. "Malicious Render Farm", "Known Deepfake"
    geoLocation?: string;
    associatedActors?: string[];
    lastSeen: string;
    details: string;
  }
  
  export interface User {
    username: string;
  }

  export enum AppRoute {
    HOME = '/',
    LOGIN = '/login',
    ANALYZER = '/analyzer',
    FORENSICS = '/forensics',
    GLOBAL_THREAT = '/global-threat',
    ABOUT = '/about',
  }
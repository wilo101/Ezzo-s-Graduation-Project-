import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ThreatReport } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeAudio = async (
  base64Audio: string, 
  mimeType: string,
  fileName: string
): Promise<AnalysisResult> => {
  
  const ai = getAI();

  // Updated prompt to simulate a specifically trained model on voice datasets
  const prompt = `
    ACT AS: "TrustEra Model v2.5", a specialized Audio Forensics AI trained on the ASVspoof 2021, WaveFake, and In-the-Wild Deepfake datasets.

    TASK: Analyze the provided audio file for synthetic manipulation. You are looking for artifacts specific to Neural Vocoders (like WaveNet, HiFi-GAN, MelGAN) and diffusion-based audio generation.

    ANALYSIS PARAMETERS:
    1. **Spectral Continuity:** Check for "checkerboard artifacts" in the spectrogram (common in GANs).
    2. **Phase Consistency:** Analyze if the phase coherence matches natural human vocal tract production.
    3. **Breath & Micro-Tremors:** Humans have irregular micro-tremors and breaths. AI often creates "perfect" silence or rigid harmonics.
    4. **High-Frequency Cutoff:** Check if the audio has an unnatural hard cutoff at 8kHz, 16kHz, or 24kHz (common in older TTS models).

    SOURCE IDENTIFICATION:
    Compare the audio signature against known models:
    - ElevenLabs (High fidelity, emotional, specific compression artifacts)
    - MetaVoice / AudioLDM (Diffusion noise artifacts)
    - Tacotron / FastSpeech (Robotic prosody)
    - Real Human (Natural variance, legitimate room tone, complex harmonics)

    RETURN FORMAT (JSON ONLY):
    {
      "isDeepfake": boolean,
      "confidence": number (0-100),
      "riskLevel": "Low" | "Medium" | "High",
      "explanation": "Technical forensics report referencing the spectral analysis and specific artifacts found.",
      "spectrogramAnalysis": "Detailed visual description of the frequency domain observations.",
      "consistencyScore": number (0-10),
      "likelySource": "Estimated source (e.g., 'Real Human Voice', 'ElevenLabs v2', 'RVC Model', 'OpenAI TTS')",
      "technicalAnomalies": ["List of specific technical red flags found (e.g. 'Phase discontinuity at 4kHz', 'Lack of breath intake')"],
      "ipTrace": "If the metadata or steganography implies a cloud origin, HALLUCINATE a plausible IP address for the 'Network Trace' feature demonstration. If purely local/offline, return null.",
      "softwareSignature": "Estimated encoding software (e.g. 'Lavfi', 'FFmpeg', 'Unknown')"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
            { text: prompt },
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Audio
                }
            }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isDeepfake: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            explanation: { type: Type.STRING },
            spectrogramAnalysis: { type: Type.STRING },
            consistencyScore: { type: Type.NUMBER },
            likelySource: { type: Type.STRING },
            technicalAnomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
            ipTrace: { type: Type.STRING, nullable: true },
            softwareSignature: { type: Type.STRING, nullable: true },
          },
          required: ["isDeepfake", "confidence", "riskLevel", "explanation", "likelySource", "technicalAnomalies"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback for demo if API fails or key is missing
    return {
      isDeepfake: false,
      confidence: 0,
      riskLevel: "Low",
      explanation: "Analysis failed due to API connection error. Please check your network or API key.",
      spectrogramAnalysis: "N/A",
      consistencyScore: 0,
      likelySource: "Unknown",
      technicalAnomalies: ["API Error"],
      ipTrace: null
    };
  }
};

export const analyzeThreat = async (
  input: string,
  type: 'HASH' | 'IP'
): Promise<ThreatReport> => {
  const ai = getAI();
  
  const prompt = `
    ACT AS: "TrustEra Threat Intelligence Database".
    TASK: Look up the following ${type} in your (simulated) cybersecurity threat intelligence feeds.

    INPUT: ${input}

    CONTEXT: 
    - If it is an IP: Determine if it is a residential proxy, a known VPN/Tor exit node, a cloud server (AWS/GCP/Azure) often used for rendering deepfakes, or a legitimate ISP.
    - If it is a HASH (MD5/SHA256): Determine if this file hash corresponds to a known deepfake dataset, a malicious executable, or a benign file.

    Simulate a realistic threat report. If the input looks random, generate a plausible "Not Found" or "Low Risk" report. If it looks suspicious (or for demonstration), generate a "High Risk" hit.

    RETURN JSON:
    {
      "target": "${input}",
      "type": "${type}",
      "riskScore": number (0-100),
      "classification": "Short classification string (e.g. 'Malicious Render Farm', 'Benign Home Network', 'Known Deepfake Sample')",
      "geoLocation": "City, Country (if IP)",
      "associatedActors": ["List of threat actor groups or platforms (e.g. 'Lazarus Group', 'ScriptKiddies', 'Unknown')"],
      "lastSeen": "Date string",
      "details": "A technical paragraph describing the threat intelligence findings."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             target: { type: Type.STRING },
             type: { type: Type.STRING, enum: ['HASH', 'IP'] },
             riskScore: { type: Type.NUMBER },
             classification: { type: Type.STRING },
             geoLocation: { type: Type.STRING, nullable: true },
             associatedActors: { type: Type.ARRAY, items: { type: Type.STRING } },
             lastSeen: { type: Type.STRING },
             details: { type: Type.STRING }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as ThreatReport;

  } catch (error) {
    console.error("Threat Analysis Error:", error);
    return {
      target: input,
      type: type,
      riskScore: 0,
      classification: "Lookup Failed",
      details: "Unable to connect to Threat Intelligence Grid.",
      lastSeen: new Date().toISOString()
    };
  }
};
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Flame, 
  Coins, 
  ShieldCheck, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Dices, 
  Sparkles, 
  Lock, 
  Scale, 
  Info,
  RotateCcw,
  BadgeCent,
  Volume2,
  VolumeX,
  Play,
  ArrowLeft,
  ChevronRight,
  User,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Discord Bot Invite link directly configured with scopes to skip standard web landing redirect loops
const INVITE_LINK = "https://discord.com/oauth2/authorize?client_id=1524862325927182536&permissions=543231040&scope=bot+applications.commands";

// Ambience colors theme config mapping
interface AmbienceTheme {
  name: string;
  glowClass: string;
  textClass: string;
  borderClass: string;
  bgGradient: string;
  buttonActive: string;
  accentHex: string;
}

const THEMES: Record<string, AmbienceTheme> = {
  gold: {
    name: "Gold",
    glowClass: "shadow-amber-500/20",
    textClass: "text-amber-500",
    borderClass: "border-amber-500/20",
    bgGradient: "from-amber-500/10",
    buttonActive: "bg-amber-500/10 text-amber-400 border-amber-500/40",
    accentHex: "#f59e0b"
  },
  cyber: {
    name: "Cyber",
    glowClass: "shadow-cyan-500/20",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/20",
    bgGradient: "from-cyan-500/10",
    buttonActive: "bg-cyan-500/10 text-cyan-400 border-cyan-500/40",
    accentHex: "#06b6d4"
  },
  emerald: {
    name: "Emerald",
    glowClass: "shadow-emerald-500/20",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
    bgGradient: "from-emerald-500/10",
    buttonActive: "bg-emerald-500/10 text-emerald-400 border-emerald-500/40",
    accentHex: "#10b981"
  },
  crimson: {
    name: "Crimson",
    glowClass: "shadow-red-500/20",
    textClass: "text-red-500",
    borderClass: "border-red-500/20",
    bgGradient: "from-red-500/10",
    buttonActive: "bg-red-500/10 text-red-500 border-red-500/40",
    accentHex: "#ef4444"
  }
};

interface Card {
  suit: string;
  value: string;
  num: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"portal" | "demo">("portal");
  const [selectedAmbience, setSelectedAmbience] = useState<"gold" | "cyber" | "emerald" | "crimson">("gold");
  const [credits, setCredits] = useState<number>(15000); // 15,000 credits as seen in screenshots
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [legalView, setLegalView] = useState<"none" | "privacy" | "terms">("none");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // Spin Me! Hero Animation State
  const [heroSpinning, setHeroSpinning] = useState<boolean>(false);

  // Simulated Console Command Selection
  const [activeCommand, setActiveCommand] = useState<"slots" | "blackjack" | "coinflip" | "daily">("slots");
  const [typingState, setTypingState] = useState<boolean>(false);

  const theme = THEMES[selectedAmbience];

  // Detect and handle direct invite, privacy, and terms URLs (including hashes like #/invite, #/privacy, #/terms to ensure compatibility with GitHub Pages SPA routing)
  useEffect(() => {
    const handleUrlRedirect = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      
      if (
        hash === "#/invite" || 
        hash === "#invite" || 
        path === "/invite" || 
        path.endsWith("/invite")
      ) {
        setIsRedirecting(true);
        // Play win chime
        playSfx("win");
        // Redirect directly
        setTimeout(() => {
          window.location.href = INVITE_LINK;
        }, 800);
      } else if (
        hash === "#/privacy" ||
        hash === "#privacy" ||
        path === "/privacy" ||
        path.endsWith("/privacy")
      ) {
        setActiveTab("portal");
        setLegalView("privacy");
      } else if (
        hash === "#/terms" ||
        hash === "#terms" ||
        hash === "#/tos" ||
        hash === "#tos" ||
        path === "/terms" ||
        path.endsWith("/terms") ||
        path === "/tos" ||
        path.endsWith("/tos")
      ) {
        setActiveTab("portal");
        setLegalView("terms");
      } else {
        setLegalView("none");
      }
    };

    handleUrlRedirect();
    window.addEventListener("hashchange", handleUrlRedirect);
    return () => window.removeEventListener("hashchange", handleUrlRedirect);
  }, []);

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-[#07070d] text-[#e4e4e7] font-sans flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
        {/* Absolute Glow Backgrounds */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-[radial-gradient(circle_at_center,${theme.accentHex}1a,transparent_60%)] pointer-events-none`} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[430px] bg-[#0d0d16] border border-zinc-800/80 rounded-2xl p-8 text-center space-y-6 relative z-10 shadow-2xl"
          style={{ boxShadow: `0 20px 50px -12px ${theme.accentHex}15` }}
        >
          {/* Pulsing Slot / Spinner Icon */}
          <div className="flex justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className={`w-16 h-16 rounded-full border-2 border-dashed ${theme.borderClass} flex items-center justify-center bg-[#12121e]`}
            >
              <Sparkles className={`w-6 h-6 ${theme.textClass}`} />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight text-center">Redirecting to Discord</h2>
            <p className="text-zinc-400 text-xs font-mono text-center">Preparing secure guild authorization session...</p>
          </div>

          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/2 rounded-full"
              style={{ backgroundColor: theme.accentHex }}
            />
          </div>

          <p className="text-zinc-500 text-[10px] font-mono text-center">
            If you are not redirected automatically, <a href={INVITE_LINK} className="text-amber-400 underline hover:text-amber-300">click here</a>.
          </p>
        </motion.div>
      </div>
    );
  }

  // --- GAME: Slots States ---
  const [slotsReels, setSlotsReels] = useState<string[]>(["🎰", "🎰", "🎰"]);
  const [slotsPlaying, setSlotsPlaying] = useState<boolean>(false);
  const [slotsLog, setSlotsLog] = useState<string>("");

  // --- GAME: Blackjack States ---
  const [bjPlayerHand, setBjPlayerHand] = useState<Card[]>([]);
  const [bjDealerHand, setBjDealerHand] = useState<Card[]>([]);
  const [bjStatus, setBjStatus] = useState<"betting" | "playing" | "player_won" | "dealer_won" | "push" | "bust">("betting");

  // --- GAME: Coinflip States ---
  const [coinChoice, setCoinChoice] = useState<"heads" | "tails">("heads");
  const [coinFlipping, setCoinFlipping] = useState<boolean>(false);
  const [coinResult, setCoinResult] = useState<"heads" | "tails" | null>(null);
  const [coinLog, setCoinLog] = useState<string>("");

  // --- GAME: Daily Reward State ---
  const [dailyClaimed, setDailyClaimed] = useState<boolean>(false);
  const [dailyLog, setDailyLog] = useState<string>("");

  // Synthesize advanced audio effects using the Web Audio API
  const playSfx = (type: "click" | "hover" | "spin" | "deal" | "win" | "lose" | "daily" | "jackpot") => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.05);
      } else if (type === "hover") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(350, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.03);
      } else if (type === "spin") {
        const duration = 0.6;
        const steps = 8;
        for (let i = 0; i < steps; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const stepTime = now + (i * (duration / steps));
          osc.frequency.setValueAtTime(200 + (i * 100), stepTime);
          gain.gain.setValueAtTime(0.03, stepTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(stepTime);
          osc.stop(stepTime + 0.06);
        }
      } else if (type === "deal") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.12);
      } else if (type === "win") {
        // Triumphant C-major triad chime
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + (idx * 0.08));
          gain.gain.setValueAtTime(0.04, now + (idx * 0.08));
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx * 0.08) + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + (idx * 0.08));
          osc.stop(now + (idx * 0.08) + 0.25);
        });
      } else if (type === "lose") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.35);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.35);
      } else if (type === "jackpot") {
        const duration = 0.8;
        const notes = [523, 587, 659, 698, 784, 880, 988, 1046];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const time = now + (i * 0.06);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0.05, time);
          gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.15);
        });
      } else if (type === "daily") {
        const steps = 12;
        for (let i = 0; i < steps; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const stepTime = now + (i * 0.04);
          osc.type = "sine";
          osc.frequency.setValueAtTime(800 + (Math.sin(i) * 300), stepTime);
          gain.gain.setValueAtTime(0.03, stepTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(stepTime);
          osc.stop(stepTime + 0.1);
        }
      }
    } catch (e) {
      // AudioContext fails gracefully if user has not interacted yet
    }
  };

  const handleCopyLink = () => {
    playSfx("click");
    navigator.clipboard.writeText(INVITE_LINK);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Click spinning of top decorative slot machine to trigger a funny quick sound/vibe
  const spinHeroSlots = () => {
    if (heroSpinning) return;
    setHeroSpinning(true);
    playSfx("spin");
    setTimeout(() => {
      setHeroSpinning(false);
      playSfx("win");
    }, 700);
  };

  // Helper to handle tab switching
  const handleTabChange = (tab: "portal" | "demo") => {
    playSfx("click");
    setActiveTab(tab);
    setLegalView("none");
  };

  // Simulate command typing delays
  const triggerCommand = (commandName: "slots" | "blackjack" | "coinflip" | "daily") => {
    playSfx("click");
    setActiveCommand(commandName);
    setTypingState(true);
    setTimeout(() => {
      setTypingState(false);
      if (commandName === "daily") {
        setDailyLog("");
      } else if (commandName === "coinflip") {
        setCoinLog("");
      } else if (commandName === "slots") {
        setSlotsLog("");
      }
    }, 400);
  };

  // --- BLACKJACK GAMEPLAY LOGIC ---
  const suits = ["♥️", "♦️", "♣️", "♠️"];
  const cardVals = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  const generateCard = (): Card => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const val = cardVals[Math.floor(Math.random() * cardVals.length)];
    let num = parseInt(val);
    if (["J", "Q", "K"].includes(val)) num = 10;
    if (val === "A") num = 11;
    return { suit, value: val, num };
  };

  const getHandScore = (hand: Card[]): number => {
    let score = hand.reduce((acc, c) => acc + c.num, 0);
    let aces = hand.filter(c => c.value === "A").length;
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
    return score;
  };

  const startBlackjack = () => {
    if (credits < 1000) {
      playSfx("lose");
      alert("You need at least 1,000 credits to play Blackjack!");
      return;
    }
    setCredits(prev => prev - 1000);
    playSfx("deal");

    const p1 = generateCard();
    const p2 = generateCard();
    const d1 = generateCard();
    const d2 = generateCard();

    const pHand = [p1, p2];
    const dHand = [d1, d2];

    setBjPlayerHand(pHand);
    setBjDealerHand(dHand);

    const playerInitial = getHandScore(pHand);
    if (playerInitial === 21) {
      setBjStatus("player_won");
      setCredits(prev => prev + 2500); // 2.5x payout
      playSfx("win");
    } else {
      setBjStatus("playing");
    }
  };

  const hitBlackjack = () => {
    if (bjStatus !== "playing") return;
    playSfx("deal");
    const newCard = generateCard();
    const updatedHand = [...bjPlayerHand, newCard];
    setBjPlayerHand(updatedHand);

    const score = getHandScore(updatedHand);
    if (score > 21) {
      setBjStatus("bust");
      playSfx("lose");
    }
  };

  const standBlackjack = () => {
    if (bjStatus !== "playing") return;
    playSfx("click");

    let currentDealerHand = [...bjDealerHand];
    let dealerScore = getHandScore(currentDealerHand);

    // Dealer draws up to 17
    while (dealerScore < 17) {
      currentDealerHand.push(generateCard());
      dealerScore = getHandScore(currentDealerHand);
    }

    setBjDealerHand(currentDealerHand);

    const pScore = getHandScore(bjPlayerHand);
    if (dealerScore > 21) {
      setBjStatus("player_won");
      setCredits(prev => prev + 2000); // 2x payout
      playSfx("win");
    } else if (pScore > dealerScore) {
      setBjStatus("player_won");
      setCredits(prev => prev + 2000);
      playSfx("win");
    } else if (pScore < dealerScore) {
      setBjStatus("dealer_won");
      playSfx("lose");
    } else {
      setBjStatus("push");
      setCredits(prev => prev + 1000); // refund
      playSfx("click");
    }
  };

  // --- SLOTS SIMULATION LOGIC ---
  const spinSlotsCommand = () => {
    if (slotsPlaying || credits < 500) {
      playSfx("lose");
      return;
    }
    setSlotsPlaying(true);
    setCredits(prev => prev - 500);
    setSlotsLog("");
    playSfx("spin");

    const pool = ["🎰", "🍒", "💎", "🍋", "🍀", "🔥"];
    let rollsCount = 0;
    const interval = setInterval(() => {
      setSlotsReels([
        pool[Math.floor(Math.random() * pool.length)],
        pool[Math.floor(Math.random() * pool.length)],
        pool[Math.floor(Math.random() * pool.length)]
      ]);
      rollsCount++;

      if (rollsCount > 8) {
        clearInterval(interval);
        
        // Final roll outcome biased for fun
        const r = Math.random();
        let finalReels = [
          pool[Math.floor(Math.random() * pool.length)],
          pool[Math.floor(Math.random() * pool.length)],
          pool[Math.floor(Math.random() * pool.length)]
        ];

        if (r > 0.6) {
          // Guaranteed triple match
          const chosen = pool[Math.floor(Math.random() * pool.length)];
          finalReels = [chosen, chosen, chosen];
        } else if (r > 0.25) {
          // Guaranteed double match
          const chosen = pool[Math.floor(Math.random() * pool.length)];
          finalReels = [chosen, chosen, pool[Math.floor(Math.random() * pool.length)]];
        }

        setSlotsReels(finalReels);

        // Evaluation
        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          const payout = finalReels[0] === "🎰" ? 8000 : finalReels[0] === "💎" ? 4000 : 2500;
          setCredits(prev => prev + payout);
          setSlotsLog(`🎉 JACKPOT! 3x ${finalReels[0]} awarded +${payout} credits!`);
          playSfx("jackpot");
        } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
          const payout = 1000;
          setCredits(prev => prev + payout);
          setSlotsLog(`✨ Nice double! 2x matches paid +${payout} credits.`);
          playSfx("win");
        } else {
          setSlotsLog("❌ No match. Try spinning again!");
          playSfx("lose");
        }
        setSlotsPlaying(false);
      }
    }, 100);
  };

  // --- COIN FLIP PLAY LOGIC ---
  const handleCoinflipPlay = (userChoice: "heads" | "tails") => {
    if (coinFlipping || credits < 500) {
      playSfx("lose");
      return;
    }
    setCoinChoice(userChoice);
    setCoinFlipping(true);
    setCredits(prev => prev - 500);
    setCoinLog("");
    playSfx("spin");

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "heads" : "tails";
      setCoinResult(outcome);
      if (outcome === userChoice) {
        setCredits(prev => prev + 1000);
        setCoinLog(`🎉 Win! It landed on ${outcome.toUpperCase()}. You gained +1,000 credits.`);
        playSfx("win");
      } else {
        setCoinLog(`❌ Lost! It landed on ${outcome.toUpperCase()}. Better luck next flip.`);
        playSfx("lose");
      }
      setCoinFlipping(false);
    }, 600);
  };

  // --- DAILY REWARD PLAY LOGIC ---
  const claimDaily = () => {
    if (dailyClaimed) {
      playSfx("lose");
      setDailyLog("⏰ Daily reward already claimed. Reset balance below to try again!");
      return;
    }
    setDailyClaimed(true);
    setCredits(prev => prev + 5000); // Give 5,000 credits
    setDailyLog("🎁 SUCCESS! You have claimed your +5,000 daily credits!");
    playSfx("daily");
  };

  // Reset function
  const resetDemoState = () => {
    playSfx("click");
    setCredits(15000);
    setDailyClaimed(false);
    setDailyLog("");
    setSlotsLog("");
    setCoinLog("");
    setBjStatus("betting");
    setBjPlayerHand([]);
    setBjDealerHand([]);
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-[#e4e4e7] font-sans flex flex-col justify-center items-center px-4 py-8 selection:bg-amber-500/20 selection:text-amber-200 overflow-x-hidden relative">
      
      {/* Absolute Glow Backgrounds scaled nicely */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-[radial-gradient(circle_at_center,${theme.accentHex}1a,transparent_60%)] pointer-events-none transition-all duration-500`} />
      
      {/* Compact layout wrapped inside a modern phone/centered viewport card layout */}
      <div className="w-full max-w-[430px] flex flex-col space-y-6 relative z-10">
        
        {/* Compact Sound & Options bar */}
        <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GUILD PORTAL ACTIVE</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className="hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1 py-1"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className={`w-3.5 h-3.5 ${theme.textClass}`} />
                  <span className="text-[10px]">SFX ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="text-[10px]">MUTED</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Top Spinning Slot Frame */}
        <div className="flex flex-col items-center text-center space-y-4">
          <button 
            onClick={spinHeroSlots}
            onMouseEnter={() => playSfx("hover")}
            className="group relative cursor-pointer outline-none focus:outline-none"
            id="slot-spinner-trigger"
          >
            {/* Pulsing Back Glow */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent blur-xl group-hover:scale-125 transition-transform duration-500`} />
            
            {/* Spinning Gold Frame */}
            <motion.div 
              animate={heroSpinning ? { rotate: [0, 360, 720] } : {}}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={`w-28 h-28 rounded-full border-2 ${theme.borderClass} ${theme.glowClass} shadow-xl flex items-center justify-center bg-[#0d0d16] transition-all duration-500`}
            >
              <span className="text-5xl select-none filter drop-shadow-md">🎰</span>
            </motion.div>

            {/* SPIN ME Tooltip */}
            <div className="absolute -top-2 -right-5 rotate-12 bg-white text-black font-mono font-black text-[9px] px-2 py-0.5 rounded-full shadow-md select-none tracking-wider uppercase border border-zinc-200">
              SPIN ME!
            </div>
          </button>

          {/* Titles */}
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white">
              Casino<span className={`${theme.textClass} transition-colors duration-500`}>Forge</span>
            </h1>
            <p className="text-zinc-400 text-xs max-w-[280px] mx-auto font-light leading-relaxed">
              The ultimate high-stakes casino engine for your Discord community.
            </p>
          </div>
        </div>

        {/* Simple Double Tab Selector matching Screenshot */}
        <div className="grid grid-cols-2 bg-[#12121e]/80 border border-zinc-800/80 p-1 rounded-xl font-mono text-xs shadow-inner">
          <button
            onClick={() => handleTabChange("portal")}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 font-bold cursor-pointer transition-all ${
              activeTab === "portal" 
                ? "bg-zinc-900 text-white shadow" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${activeTab === "portal" ? theme.textClass : ""}`} />
            ⚡ Bot Portal
          </button>
          <button
            onClick={() => handleTabChange("demo")}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 font-bold cursor-pointer transition-all ${
              activeTab === "demo" 
                ? "bg-zinc-900 text-white shadow" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Dices className={`w-3.5 h-3.5 ${activeTab === "demo" ? theme.textClass : ""}`} />
            🎲 Play Demo
          </button>
        </div>

        {/* Main Content Pane */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* TAB: Bot Portal View */}
            {activeTab === "portal" && legalView === "none" && (
              <motion.div
                key="portal-main"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                {/* Add to Discord Instantly (Bypass Login Button) */}
                <a
                  href={INVITE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx("win")}
                  onMouseEnter={() => playSfx("hover")}
                  className="relative group overflow-hidden w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.01] hover:shadow-amber-500/25 cursor-pointer border border-white/20"
                >
                  {/* Gloss Animation Shine */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/25 opacity-40 group-hover:animate-shine" />
                  <span>Add to Discord Instantly</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                {/* Privacy Policy Trigger */}
                <button
                  onClick={() => { playSfx("click"); window.location.hash = "#/privacy"; }}
                  onMouseEnter={() => playSfx("hover")}
                  className="w-full h-12 bg-[#12121e]/90 border border-zinc-800/80 hover:bg-[#181829] text-zinc-300 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Privacy Policy</span>
                </button>

                {/* Terms of Service Trigger */}
                <button
                  onClick={() => { playSfx("click"); window.location.hash = "#/terms"; }}
                  onMouseEnter={() => playSfx("hover")}
                  className="w-full h-12 bg-[#12121e]/90 border border-zinc-800/80 hover:bg-[#181829] text-zinc-300 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Terms of Service</span>
                </button>

                {/* Bot Features Info Box */}
                <div className="bg-[#0b0b14]/50 rounded-xl p-4 border border-zinc-900/80 text-zinc-500 text-[11px] space-y-1.5 font-mono leading-relaxed">
                  <div className="flex items-center gap-1 text-zinc-400 font-bold">
                    <ShieldCheck className={`w-3.5 h-3.5 ${theme.textClass}`} />
                    <span>SECURE DIRECT AUTHENTICATION</span>
                  </div>
                  <p>
                    By clicking our instant link, you bypass all browser redirect loops. The bot registers within your Guild with standard command permissions instantly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB: Live Bot Console Play Demo */}
            {activeTab === "demo" && (
              <motion.div
                key="demo-main"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                {/* Console header details */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>LIVE BOT CONSOLE</span>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] text-amber-400 font-mono font-bold">
                    <span>💰</span>
                    <span>{credits.toLocaleString()} credits</span>
                  </div>
                </div>

                {/* Sub row of slash command filter buttons */}
                <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
                  {(["slots", "blackjack", "coinflip", "daily"] as const).map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => triggerCommand(cmd)}
                      onMouseEnter={() => playSfx("hover")}
                      className={`py-1.5 px-1.5 rounded-md border text-center transition-all cursor-pointer font-bold ${
                        activeCommand === cmd
                          ? theme.buttonActive
                          : "bg-zinc-950/80 text-zinc-500 border-zinc-900 hover:text-zinc-300 hover:border-zinc-800"
                      }`}
                    >
                      /{cmd}
                    </button>
                  ))}
                </div>

                {/* Interactive Discord Style Message Container */}
                <div className="bg-[#0f0f1c] rounded-2xl border border-zinc-800/80 p-4 space-y-3 relative shadow-lg">
                  
                  {/* Discord User Line */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1e1f38] flex items-center justify-center font-mono font-black text-xs text-amber-400 border border-amber-500/10 select-none">
                      🎰
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white font-mono">CasinoForge</span>
                        <span className="bg-[#5865f2] text-white font-sans font-extrabold text-[8px] px-1 py-0.2 rounded uppercase select-none tracking-wider">
                          BOT
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-mono font-light">Guild Companion Engine</p>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  {typingState ? (
                    <div className="flex items-center gap-1 pl-1 font-mono text-[10px] text-zinc-500">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 text-[9px] uppercase">executing /{activeCommand}...</span>
                    </div>
                  ) : (
                    
                    /* Discord Embed Card representation matching screenshots */
                    <div 
                      className="border-l-[3px] bg-[#07070d]/70 rounded-r-lg p-3.5 space-y-3 font-mono text-[11px] transition-all duration-500"
                      style={{ borderLeftColor: theme.accentHex }}
                    >
                      {/* Active Command Interactive Screens */}
                      
                      {/* SLOTS MODULE */}
                      {activeCommand === "slots" && (
                        <div className="space-y-3">
                          <div className="text-zinc-400 font-bold text-xs">🎰 Virtual Slot Machine</div>
                          <p className="text-zinc-500 text-[10px] leading-relaxed">
                            Pull the lever of our extreme payout guild slot machine emulator. Cost: <span className="text-amber-500">500 credits</span>.
                          </p>

                          {/* Dynamic Reels Display */}
                          <div className="flex justify-center gap-3 py-3 bg-zinc-950/80 rounded-xl border border-zinc-900 shadow-inner">
                            {slotsReels.map((reel, idx) => (
                              <motion.div
                                key={idx}
                                animate={slotsPlaying ? { y: [0, -10, 10, 0] } : {}}
                                transition={{ repeat: slotsPlaying ? Infinity : 0, duration: 0.12 }}
                                className="w-10 h-10 bg-[#12121e] rounded-lg border border-zinc-800 flex items-center justify-center text-xl select-none"
                              >
                                {reel}
                              </motion.div>
                            ))}
                          </div>

                          {slotsLog && (
                            <div className="p-2 rounded bg-zinc-950/40 border border-zinc-900/50 text-[10px] text-zinc-300 text-center leading-relaxed">
                              {slotsLog}
                            </div>
                          )}

                          <button
                            onClick={spinSlotsCommand}
                            disabled={slotsPlaying || credits < 500}
                            className={`w-full py-2.5 rounded-lg text-black font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-all ${
                              slotsPlaying 
                                ? "bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed" 
                                : "bg-white hover:bg-zinc-200"
                            }`}
                          >
                            {slotsPlaying ? "Spinning..." : "SPIN FOR 500 CREDITS"}
                          </button>
                        </div>
                      )}

                      {/* BLACKJACK MODULE */}
                      {activeCommand === "blackjack" && (
                        <div className="space-y-3">
                          <div className="text-zinc-400 font-bold text-xs">🃏 Premium Blackjack Table</div>
                          
                          {bjStatus === "betting" ? (
                            <div className="space-y-2 py-1">
                              <p className="text-zinc-500 text-[10px]">
                                Place your hand. Standard table bet is <span className="text-amber-500">1,000 credits</span>. Blackjack pays out 2.5x!
                              </p>
                              <button
                                onClick={startBlackjack}
                                className="w-full py-2.5 rounded bg-white hover:bg-zinc-200 text-black font-bold text-[10px] uppercase tracking-widest cursor-pointer"
                              >
                                DEAL CARDS
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {/* Hands visual representation */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                                  <span className="text-[9px] text-zinc-500 block">DEALER HAND:</span>
                                  <div className="flex gap-1 text-xs font-bold text-zinc-200">
                                    {bjDealerHand.map((card, i) => (
                                      <span key={i} className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                                        {i === 1 && bjStatus === "playing" ? "?" : `${card.suit}${card.value}`}
                                      </span>
                                    ))}
                                  </div>
                                  <span className="text-[9px] text-zinc-600 font-bold block">
                                    Score: {bjStatus === "playing" ? "?" : getHandScore(bjDealerHand)}
                                  </span>
                                </div>

                                <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                                  <span className="text-[9px] text-zinc-500 block">YOUR HAND:</span>
                                  <div className="flex gap-1 text-xs font-bold text-zinc-200">
                                    {bjPlayerHand.map((card, i) => (
                                      <span key={i} className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                                        {card.suit}{card.value}
                                      </span>
                                    ))}
                                  </div>
                                  <span className="text-[9px] text-zinc-600 font-bold block">
                                    Score: {getHandScore(bjPlayerHand)}
                                  </span>
                                </div>
                              </div>

                              {/* Interactive actions or results */}
                              {bjStatus === "playing" ? (
                                <div className="grid grid-cols-2 gap-2">
                                  <button
                                    onClick={hitBlackjack}
                                    className="py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-[10px] uppercase cursor-pointer"
                                  >
                                    🃏 Hit
                                  </button>
                                  <button
                                    onClick={standBlackjack}
                                    className="py-2 rounded bg-[#1e1f38] hover:bg-[#2a2b4f] border border-zinc-700 text-white font-bold text-[10px] uppercase cursor-pointer"
                                  >
                                    🛑 Stand
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <div className="p-2 text-center rounded text-[10px] font-bold bg-zinc-950/50 border border-zinc-900 text-zinc-300">
                                    {bjStatus === "player_won" && "🎉 Victory! You won +2,000 credits."}
                                    {bjStatus === "dealer_won" && "❌ Loss! Dealer won the hand."}
                                    {bjStatus === "bust" && "💥 Busted! You went over 21."}
                                    {bjStatus === "push" && "🤝 Tie! Credits refunded."}
                                  </div>
                                  <button
                                    onClick={() => setBjStatus("betting")}
                                    className="w-full py-2 bg-white hover:bg-zinc-200 text-black font-bold text-[10px] uppercase tracking-wide cursor-pointer rounded"
                                  >
                                    Play Again
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* COINFLIP MODULE */}
                      {activeCommand === "coinflip" && (
                        <div className="space-y-3">
                          <div className="text-zinc-400 font-bold text-xs">🪙 Double-or-Nothing Coin Flip</div>
                          <p className="text-zinc-500 text-[10px] leading-relaxed">
                            Pick a side. Correct guess wins double your credits. Cost: <span className="text-amber-500">500 credits</span>.
                          </p>

                          <div className="flex justify-center py-2.5">
                            <motion.div
                              animate={coinFlipping ? { rotateY: [0, 360, 720] } : {}}
                              transition={{ duration: 0.5 }}
                              className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border border-amber-300 flex items-center justify-center font-bold text-lg text-black shadow select-none"
                            >
                              {coinResult === "tails" ? "👑" : "🪙"}
                            </motion.div>
                          </div>

                          {coinLog && (
                            <div className="p-2 rounded bg-zinc-950/40 border border-zinc-900/50 text-[10px] text-zinc-300 text-center leading-relaxed">
                              {coinLog}
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleCoinflipPlay("heads")}
                              disabled={coinFlipping}
                              className="py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-[9px] uppercase tracking-wider cursor-pointer border border-zinc-800"
                            >
                              🪙 Heads
                            </button>
                            <button
                              onClick={() => handleCoinflipPlay("tails")}
                              disabled={coinFlipping}
                              className="py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-[9px] uppercase tracking-wider cursor-pointer border border-zinc-800"
                            >
                              👑 Tails
                            </button>
                          </div>
                        </div>
                      )}

                      {/* DAILY MODULE */}
                      {activeCommand === "daily" && (
                        <div className="space-y-3">
                          <div className="text-zinc-400 font-bold text-xs">🎁 Daily Credit Allowance</div>
                          <p className="text-zinc-500 text-[10px] leading-relaxed">
                            Claim your daily package to test-drive features. Gives <span className="text-emerald-400 font-extrabold">+5,000 credits</span> instantly!
                          </p>

                          {dailyLog && (
                            <div className="p-2 rounded bg-zinc-950/40 border border-zinc-900/50 text-[10px] text-zinc-300 text-center leading-relaxed">
                              {dailyLog}
                            </div>
                          )}

                          <button
                            onClick={claimDaily}
                            disabled={dailyClaimed}
                            className={`w-full py-2.5 rounded font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                              dailyClaimed
                                ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                                : "bg-white hover:bg-zinc-200 text-black"
                            }`}
                          >
                            {dailyClaimed ? "Already Claimed" : "CLAIM DAILY CREDITS"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reset emulator link */}
                  <div className="pt-2 text-center">
                    <button
                      onClick={resetDemoState}
                      className="text-[9px] font-mono text-zinc-500 hover:text-amber-500 transition-colors cursor-pointer inline-flex items-center gap-1 py-1 px-2 hover:bg-zinc-950 rounded border border-transparent hover:border-zinc-900"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reset Demo Balance</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* POLICY SUB-PAGE: Privacy Policy */}
            {legalView === "privacy" && (
              <motion.div
                key="privacy-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-[#12121e]/90 border border-zinc-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <button 
                    onClick={() => { playSfx("click"); window.location.hash = "#/"; }}
                    className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-xs text-white uppercase">Privacy Policy</span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 space-y-3 max-h-[250px] overflow-y-auto pr-1 leading-relaxed text-left">
                  <p className="text-zinc-500 italic">Last updated: July 15, 2026</p>
                  <p>
                    Dewangga-crypto ("we", "us") operates CasinoForge-Bot. We care about your privacy and only collect the minimum data needed to run the bot.
                  </p>
                  <div className="space-y-1.5">
                    <span className="text-white font-bold block">1. Data We Collect</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong className="text-zinc-300">Discord User IDs:</strong> To save your casino balance, inventory, and stats.</li>
                      <li><strong className="text-zinc-300">Server IDs:</strong> To remember bot settings or configurations for a specific server.</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-bold block">2. How We Use Data</span>
                    <p>We only use this data to make the bot work (e.g., loading your balance when you play a casino game). We never sell, share, or use this data for anything outside of the bot's features.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-bold block">3. Data Deletion</span>
                    <p>If you want your data completely deleted from our system, you can contact the developer via GitHub (dewangga-crypto) or remove the bot from your server.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* POLICY SUB-PAGE: Terms of Service */}
            {legalView === "terms" && (
              <motion.div
                key="terms-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-[#12121e]/90 border border-zinc-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <button 
                    onClick={() => { playSfx("click"); window.location.hash = "#/"; }}
                    className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-xs text-white uppercase">Terms of Service</span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 space-y-3 max-h-[250px] overflow-y-auto pr-1 leading-relaxed text-left">
                  <p className="text-zinc-500 italic">Last updated: July 15, 2026</p>
                  <p>
                    Welcome to CasinoForge-Bot ("the Bot"), a Discord application developed by dewangga-crypto ("we", "us", or "our"). By adding the Bot to your Discord server or interacting with it, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the Bot.
                  </p>
                  <div className="space-y-1.5">
                    <span className="text-white font-bold block">1. Eligibility & Discord Terms</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>You must be at least 13 years old (or the minimum age required in your country) to use Discord and this Bot.</li>
                      <li>You agree to follow the official Discord Terms of Service and Community Guidelines at all times while using the Bot.</li>
                    </ul>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-white font-bold block">2. Fair Play & Bot Economy Rules</span>
                    <p>Because CasinoForge-Bot features a virtual casino and economy system, the following actions are strictly prohibited and may result in a permanent ban from using the Bot:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong className="text-zinc-300">Exploiting Bugs:</strong> Utilizing any software bugs, glitches, or unintended game mechanics to gain virtual currency, items, or status. You must report any discovered exploits to the developer.</li>
                      <li><strong className="text-zinc-300">Automation & Alts:</strong> Using macro scripts, self-bots, automated systems, or multiple alternative Discord accounts ("alts") to farm currency or automate commands.</li>
                      <li><strong className="text-zinc-300">Real-Money Trading (RMT):</strong> Attempting to buy, sell, or trade virtual currency or items from the Bot for real-world money, real goods, or external services. The Bot's currency has zero real-world value.</li>
                      <li><strong className="text-zinc-300">Harassment & Abuse:</strong> Using the Bot's custom commands or inputs to harass, insult, or disrupt other users.</li>
                    </ul>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-white font-bold block">3. Disclaimers & Service Availability</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong className="text-zinc-300">"As-Is" Basis:</strong> The Bot is provided on an "as-is" and "as-available" basis. We do not guarantee that the Bot will always be online, bug-free, or uninterrupted.</li>
                      <li><strong className="text-zinc-300">Data Resets:</strong> We reserve the right to reset, modify, or balance the virtual economy, user balances, or data at any time without prior notice if it is necessary for maintenance or fair play.</li>
                      <li><strong className="text-zinc-300">Limitation of Liability:</strong> The developer cannot be held liable for any data loss, server disruptions, or negative experiences resulting from the use or downtime of the Bot.</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-bold block">4. Termination of Access</span>
                    <p>We reserve the right to suspend or permanently block your access (or your server's access) to CasinoForge-Bot at our sole discretion, without warning, if you violate these terms or engage in behavior that harms the Bot's community.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-bold block">5. Changes to These Terms</span>
                    <p>We may update these Terms of Service from time to time. Continued use of the Bot after updates are made constitutes your acceptance of the new terms.</p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* SELECT AMBIENCE PANEL - exact replication from second screenshot */}
        <div className="space-y-2 pt-4 border-t border-zinc-900">
          <div className="text-center text-[9px] font-mono tracking-widest text-zinc-500 uppercase select-none">
            SELECT AMBIENCE
          </div>
          <div className="grid grid-cols-4 gap-2 font-mono text-[11px]">
            {Object.keys(THEMES).map((key) => {
              const item = THEMES[key];
              const isSelected = selectedAmbience === key;
              return (
                <button
                  key={key}
                  onClick={() => { playSfx("click"); setSelectedAmbience(key as any); }}
                  onMouseEnter={() => playSfx("hover")}
                  className={`py-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isSelected
                      ? `bg-zinc-900 border-zinc-700 text-white shadow-lg ${item.glowClass}`
                      : "bg-[#0b0b14]/50 border-zinc-900/80 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full block"
                    style={{ backgroundColor: item.accentHex }}
                  />
                  <span className="text-[9px] font-bold">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Compact Footer */}
        <footer className="text-center font-mono text-[9px] text-zinc-600 space-y-1 pt-2">
          <p>© 2026 CasinoForge. All rights reserved.</p>
          <div className="flex justify-center items-center gap-2 text-zinc-500">
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => { playSfx("click"); window.location.hash = "#/privacy"; }}>Privacy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => { playSfx("click"); window.location.hash = "#/terms"; }}>Terms</span>
            <span>•</span>
            <a href="https://github.com/dewangga-crypto" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 flex items-center gap-0.5">
              <span>GitHub</span>
              <ExternalLink className="w-2 h-2" />
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}

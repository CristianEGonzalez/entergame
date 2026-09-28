import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface GanadorHistorial {
  name: string;
  time: string;
}

const ITEM_HEIGHT = 60;

const DEMO_NAMES = ["link_hyrule", "mario_bros", "samus_aran", "donkey_kong", "kirby_star", "fox_mccloud", "pikachu_bolt", "bowser_king", "princess_peach", "yoshi_island", "captain_falcon", "ness_pk", "zelda_wisdom", "wario_ware", "waluigi_time"];

/* ========================================================
   SISTEMA DE AUDIO 
======================================================== */
let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTickSound(frequency = 750, duration = 0.035) {
  if (isAudioMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error(e);
  }
}

function playWinSound() {
  if (isAudioMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const startTime = audioCtx.currentTime + index * 0.08;
      const duration = 0.45;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch (e) {
    console.error(e);
  }
}

/* ========================================================
   COMPONENTE PRINCIPAL
======================================================== */
const Sorteos: React.FC = () => {
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [ganadores, setGanadores] = useState<GanadorHistorial[]>([]);
  const [lastWinner, setLastWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [soundMutedState, setSoundMutedState] = useState(false);
  const [activeTab, setActiveTab] = useState<"paste" | "file">("paste");
  const [textInput, setTextInput] = useState("");
  const [fileName, setFileName] = useState("Extrae automáticamente la primera columna");
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [reelItems, setReelItems] = useState<string[]>([]);

  useEffect(() => { //Para que al clickear el link de Sorteos, la página se abra desde arriba y el header no tape el contenido
    window.scrollTo(0, 0);
  }, []);

  const reelRef = useRef<HTMLDivElement>(null);

  const toggleSound = () => {
    initAudio();
    isAudioMuted = !isAudioMuted;
    setSoundMutedState(isAudioMuted);
    if (!isAudioMuted) {
      playTickSound(880, 0.05);
    }
  };

  const updateParticipants = (newList: string[]) => {
    const cleanList = Array.from(new Set(newList.map((n) => n.trim()).filter((n) => n.length > 0)));
    setParticipantes(cleanList);

    if (cleanList.length > 0) {
      setReelItems(cleanList.slice(0, 3));
    } else {
      setReelItems([]);
    }
    if (reelRef.current) {
      reelRef.current.style.transform = "translateY(0px)";
    }
  };

  const handleApplyText = () => {
    const items = textInput
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length > 0) updateParticipants(items);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
      if (lines.length > 0) {
        let rawNames = lines.map((line) => line.split(",")[0].replace(/["']/g, "").trim());
        if (rawNames.length > 1 && (rawNames[0].toLowerCase().includes("nombre") || rawNames[0].toLowerCase().includes("usuario"))) {
          rawNames.shift();
        }
        setTextInput(rawNames.join("\n"));
        updateParticipants(rawNames);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadDemo = () => {
    setTextInput(DEMO_NAMES.join("\n"));
    updateParticipants(DEMO_NAMES);
  };

  const handleClearAll = () => {
    setTextInput("");
    setFileName("Extrae automáticamente la primera columna");
    updateParticipants([]);
    setWinnerModalOpen(false);
  };

  const getSecureRandomInt = (max: number) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  const fireCelebrationConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#0AB9E6", "#FF3028", "#fbbf24", "#0f172a"],
    });

    const end = Date.now() + 1500;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() * 0.4 + 0.3 },
        colors: ["#0AB9E6", "#FF3028", "#ffffff"],
      });
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() * 0.4 + 0.3 },
        colors: ["#0AB9E6", "#FF3028", "#ffd166"],
      });
    }, 300);
  };

  const startSpin = () => {
    if (isSpinning || participantes.length === 0) return;
    initAudio();
    setIsSpinning(true);
    setWinnerModalOpen(false);

    // Selección aleatoria 100% matemática
    const winnerIndex = getSecureRandomInt(participantes.length);
    const winner = participantes[winnerIndex];
    setLastWinner(winner);

    const TOTAL_ITEMS = Math.max(60, participantes.length * 4);
    const targetIndex = TOTAL_ITEMS - 2;
    const itemsList = new Array(TOTAL_ITEMS);

    itemsList[targetIndex] = winner;

    if (participantes.length > 1) {
      const otros = participantes.filter((p) => p !== winner);
      itemsList[targetIndex - 1] = otros[getSecureRandomInt(otros.length)];
      itemsList[targetIndex + 1] = otros[getSecureRandomInt(otros.length)];
    }

    for (let i = 0; i < TOTAL_ITEMS; i++) {
      if (itemsList[i] !== undefined) continue;
      let pick = participantes[getSecureRandomInt(participantes.length)];
      let intentos = 0;
      while (participantes.length > 1 && i > 0 && pick === itemsList[i - 1] && intentos < 10) {
        pick = participantes[getSecureRandomInt(participantes.length)];
        intentos++;
      }
      itemsList[i] = pick;
    }

    setReelItems(itemsList);

    const targetY = (targetIndex - 1) * ITEM_HEIGHT;
    const duration = 5200;
    const startTime = performance.now();
    let lastTickStep = -1;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentY = easedProgress * targetY;

      if (reelRef.current) {
        reelRef.current.style.transform = `translateY(-${currentY}px)`;
        if (progress > 0.6) {
          reelRef.current.classList.remove("blur-[4px]");
        } else {
          reelRef.current.classList.add("blur-[4px]");
        }
      }

      const currentStep = Math.floor(currentY / ITEM_HEIGHT);
      if (currentStep !== lastTickStep) {
        lastTickStep = currentStep;
        const pitch = 500 + progress * 400;
        playTickSound(pitch, 0.03);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (reelRef.current) {
          reelRef.current.style.transform = `translateY(-${targetY}px)`;
          reelRef.current.classList.remove("blur-[4px]");
        }
        setIsSpinning(false);
        setWinnerModalOpen(true);
        playWinSound();
        setGanadores((prev) => [{ name: winner, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) }, ...prev]);
        fireCelebrationConfetti();
      }
    };

    requestAnimationFrame(animate);
  };

  const handleExcludeWinner = () => {
    if (!lastWinner) return;
    const filtered = participantes.filter((n) => n !== lastWinner);
    setTextInput(filtered.join("\n"));
    updateParticipants(filtered);
    setWinnerModalOpen(false);
    setLastWinner(null);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-16 text-slate-800">
      {/* Título y subtítulo debajo de tu Header */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-b border-slate-200 px-4 pt-8 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
            <span>Lucky Slot Machine</span>
            <span>🎰</span>
          </h1>
          <p className="mt-0.5 text-xs font-semibold text-slate-500 sm:text-sm">Aplicación Gratuita de Sorteos Online</p>
        </div>

        <button onClick={toggleSound} className="flex items-center space-x-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 sm:self-auto">
          <span>{soundMutedState ? "🔇" : "🔊"}</span>
          <span>{soundMutedState ? "Sonido Silenciado" : "Sonido Activado"}</span>
        </button>
      </section>

      {/* Contenido principal */}
      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 px-4 pt-6 lg:grid-cols-12">
        {/* Panel Izquierdo: Ruleta */}
        <div className="flex flex-col space-y-6 lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-brand-cyan">
                <span className="mr-2 h-2 w-2 animate-ping rounded-full bg-brand-cyan"></span>
                <span>{participantes.length} participantes cargados</span>
              </span>
              <span className="font-mono text-xs text-slate-400">{isSpinning ? "Girando..." : participantes.length > 0 ? "Listo para girar" : "Esperando participantes"}</span>
            </div>

            {/* Visor Ruleta */}
            <div className="relative mb-6 h-45 overflow-hidden rounded-2xl border-[3px] border-slate-300 bg-[#0f172a] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-[#0f172a] via-transparent to-[#0f172a] opacity-95"></div>

              {/* Puntero Joy-Con Central */}
              <div className="pointer-events-none absolute top-1/2 right-0 left-0 z-5 -mt-7.5 flex h-15 items-center justify-between border-y-2 border-white/35 bg-linear-to-r from-brand-cyan/15 to-brand-red/15 px-2.5">
                <div className="h-0 w-0 border-y-10 border-l-12 border-y-transparent border-l-brand-cyan drop-shadow-[0_0_6px_#0AB9E6]"></div>
                <div className="h-0 w-0 border-y-10 border-r-12 border-y-transparent border-r-brand-red drop-shadow-[0_0_6px_#FF3028]"></div>
              </div>

              {/* Carrete */}
              <div ref={reelRef} className="transition-[filter] duration-100 will-change-transform">
                {reelItems.length === 0 ? (
                  <div className="flex h-15 items-center justify-center text-lg font-bold text-slate-400">Agrega participantes para comenzar</div>
                ) : (
                  reelItems.map((name, i) => (
                    <div key={i} className="flex h-15 items-center justify-center truncate px-4 text-lg font-bold text-slate-100 sm:text-xl">
                      {name}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Botón Principal */}
            <button
              onClick={startSpin}
              disabled={isSpinning || participantes.length === 0}
              className={`w-full rounded-2xl px-6 py-4 text-xl font-black tracking-wider uppercase shadow-md transition-all duration-300 ${
                participantes.length > 0 && !isSpinning ? "cursor-pointer bg-linear-to-r from-brand-cyan via-sky-500 to-brand-red text-white hover:scale-[1.01] hover:shadow-cyan-400/20 active:scale-95" : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}>
              {isSpinning ? "🌀 ¡Girando Ruleta...!" : "🎮 ¡ELEGIR GANADOR!"}
            </button>

            {/* Tarjeta Ganador */}
            {winnerModalOpen && lastWinner && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="mb-1 flex items-center justify-center space-x-2">
                  <span className="animate-bounce text-2xl">⭐</span>
                  <h3 className="text-xs font-black tracking-widest text-amber-500 uppercase">¡GANADOR DEL SORTEO ENTERGAME!</h3>
                </div>
                <div className="bg-linear-to-r from-brand-cyan to-brand-red bg-clip-text py-2 text-3xl font-extrabold wrap-break-word text-transparent sm:text-4xl">{lastWinner}</div>
                <div className="mt-4 flex justify-center gap-3">
                  <button onClick={handleExcludeWinner} className="flex items-center space-x-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-brand-red shadow-sm transition-all hover:bg-red-100">
                    <span>🗑️ Descartar para la siguiente ronda</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Historial */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                <span>🏆</span>
                <span>Ganadores Anteriores</span>
              </h4>
              {ganadores.length > 0 && (
                <button onClick={() => setGanadores([])} className="text-xs text-slate-400 transition-colors hover:text-slate-600">
                  Limpiar
                </button>
              )}
            </div>
            <div className="flex min-h-10 flex-wrap items-center gap-2 text-xs text-slate-400">
              {ganadores.length === 0 ? (
                <span className="italic">No hay ganadores aún en esta sesión.</span>
              ) : (
                ganadores.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-slate-700">
                    <span className="font-bold text-brand-cyan">#{ganadores.length - index}</span>
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Panel Derecho: Carga de Datos */}
        <div className="flex flex-col space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <h3 className="mb-1 flex items-center space-x-2 text-lg font-bold text-slate-800">
              <span>👥</span>
              <span>Lista de Participantes</span>
            </h3>
            <p className="mb-5 text-xs text-slate-400">Carga tus jugadores desde un archivo CSV o pega el texto directamente.</p>

            <div className="mb-5 flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button onClick={() => setActiveTab("paste")} className={`flex-1 rounded-lg py-2 transition-all ${activeTab === "paste" ? "bg-white text-brand-cyan shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
                Pegar Lista
              </button>
              <button onClick={() => setActiveTab("file")} className={`flex-1 rounded-lg py-2 transition-all ${activeTab === "file" ? "bg-white text-brand-red shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
                Subir CSV
              </button>
            </div>

            {activeTab === "paste" ? (
              <div className="space-y-4">
                <textarea
                  rows={7}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Pega los usuarios aquí uno debajo del otro:&#10;zelda_fan&#10;mario_kart8&#10;luigi_mansion&#10;pokemon_master"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-brand-cyan focus:bg-white focus:outline-none"
                />
                <button onClick={handleApplyText} className="w-full rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2.5 text-sm font-bold text-brand-cyan shadow-sm transition-all hover:bg-cyan-100">
                  Cargar Participantes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="group block w-full cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-colors hover:border-brand-red hover:bg-slate-100/80">
                  <span className="mb-1 block text-2xl">📂</span>
                  <span className="mb-1 block text-sm font-semibold text-slate-700 group-hover:text-brand-red">Seleccionar archivo .CSV</span>
                  <span className="text-xs text-slate-400">{fileName}</span>
                  <input type="file" accept=".csv,text/plain" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2.5 border-t border-slate-100 pt-5">
              <button onClick={handleLoadDemo} className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200">
                <span>✨ Cargar participantes de prueba</span>
              </button>
              <button onClick={handleClearAll} className="w-full rounded-xl px-4 py-2 text-xs text-slate-400 transition-colors hover:text-rose-500">
                Vaciar lista actual
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Inscritos en el Torneo</h4>
              <span className="font-mono text-xs font-bold text-brand-cyan">{participantes.length}</span>
            </div>
            <div className="max-h-40 space-y-1 overflow-y-auto pr-1 font-mono text-xs text-slate-500">
              {participantes.length === 0 ? (
                <span className="text-slate-400 italic">No hay participantes todavía.</span>
              ) : (
                participantes.map((name, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-100 py-1">
                    <span className="truncate font-medium text-slate-700">{name}</span>
                    <span className="text-[10px] text-slate-400">#{i + 1}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sorteos;

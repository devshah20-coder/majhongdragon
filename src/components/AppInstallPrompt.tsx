"use client";

import { useEffect, useState } from "react";
import { Download, Share, Smartphone } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function AppInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const alreadyDismissed = window.sessionStorage.getItem("dragonmind-install-dismissed") === "yes";
    setIsIos(ios);
    setDismissed(alreadyDismissed);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
      if (!standalone && !alreadyDismissed) setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    const timer = window.setTimeout(() => {
      if (!standalone && ios && !alreadyDismissed) setVisible(true);
    }, 1400);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.clearTimeout(timer);
    };
  }, []);

  function close() {
    window.sessionStorage.setItem("dragonmind-install-dismissed", "yes");
    setDismissed(true);
    setVisible(false);
  }

  async function install() {
    if (prompt) {
      await prompt.prompt();
      await prompt.userChoice;
    }
    close();
  }

  return (
    <>
      {!visible && !dismissed && (
        <button className="fixed bottom-[5.5rem] right-3 z-40 rounded-full bg-gold px-4 py-3 text-sm font-black text-navy shadow-glow md:bottom-4" onClick={() => setVisible(true)} type="button">
          Install app
        </button>
      )}

      {visible && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-navy/50 p-3 backdrop-blur-sm md:place-items-center">
          <section className="w-full max-w-md rounded-lg border border-gold/30 bg-navy p-5 shadow-glow">
            <div className="flex items-start gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-emerald/20 text-gold">
                {isIos ? <Share size={22} /> : prompt ? <Download size={22} /> : <Smartphone size={22} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-black">Add DragonMind to your home screen</p>
                <p className="mt-1 text-sm leading-6 text-jade/85">
                  {isIos
                    ? "iPhone requires you to approve this manually in Safari. Follow the steps below and DragonMind will appear like an app."
                    : "Approve the browser install prompt to add DragonMind as a full-screen app."}
                </p>
              </div>
            </div>

            {isIos ? (
              <ol className="mt-4 space-y-3 text-sm font-bold leading-6 text-pearl">
                <li className="rounded-lg bg-jade/10 p-3">1. Tap the Safari Share button.</li>
                <li className="rounded-lg bg-jade/10 p-3">2. Choose Add to Home Screen.</li>
                <li className="rounded-lg bg-jade/10 p-3">3. Tap Add to approve.</li>
              </ol>
            ) : (
              <div className="mt-4 rounded-lg bg-jade/10 p-3 text-sm leading-6 text-pearl">
                Press Install, then approve the browser popup. DragonMind will be added to your home screen or app launcher.
              </div>
            )}

            <div className="mt-4 flex gap-2">
              {!isIos && prompt && (
                <button className="min-h-12 flex-1 rounded-lg bg-gold px-4 py-2 text-sm font-black text-navy" onClick={install} type="button">
                  Install and approve
                </button>
              )}
              <button className="min-h-12 flex-1 rounded-lg border border-jade/30 px-4 py-2 text-sm font-bold text-pearl" onClick={close} type="button">
                {isIos ? "I understand" : "Later"}
              </button>
            </div>
            {isIos && (
              <p className="mt-3 text-xs leading-5 text-jade/70">
                Apple does not allow a website to add itself automatically. The user must approve it through Safari.
              </p>
            )}
          </section>
        </div>
      )}
    </>
  );
}

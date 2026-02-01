import "../css/style.scss";

(() => {
  const promptCard = document.getElementById("promptCard");
  const promptText = document.getElementById("promptText");
  const cake = document.getElementById("cake");
  const candles = document.getElementById("candles");
  const turtle = document.getElementById("turtle");

  const bubble = document.getElementById("bubble");
  const banner = document.getElementById("banner");

  // Helpers
  const add = (el, cls) => el.classList.add(cls);
  const remove = (el, cls) => el.classList.remove(cls);

  // Timeline (ms)
  const T0 = 0;
  const T10 = 10_000;   // cambia testo cartellino
  const T20 = 15_000;   // cartellino scompare + candeline si spengono
  const T25 = 20_000;   // torta si apre + turtle esce, cade rovesciata
  // poi: si raddrizza, esce testa/zampe, si alza su zampe posteriori,
  // blink twice, parla, cartello, confetti

  // 0s: cartello già visibile con testo iniziale
  setTimeout(() => {
    promptText.textContent = "non soffi? che fai scemo?";
  }, T10);

  setTimeout(() => {
    add(promptCard, "is-hidden");
    add(candles, "is-out"); // spegne fiamme
  }, T20);

  setTimeout(() => {
    add(cake, "is-open");        // torta si apre orizzontalmente
    add(turtle, "is-revealed");  // turtle appare "dentro" e parte animazione uscita/caduta
    add(turtle, "anim-popFall"); // esce e cade rovesciata
  }, T25);

  // Catena eventi usando animationend
  turtle.addEventListener("animationend", (e) => {
    const name = e.animationName;

    // Finita l'uscita+canduta rovesciata
    if (name === "turtlePopFall") {
      remove(turtle, "anim-popFall");
      add(turtle, "is-flipped");     // resta rovesciata un attimo
      add(turtle, "anim-righting");  // si gira nel verso giusto
    }

    // Finito il raddrizzamento
    if (name === "turtleRighting") {
      remove(turtle, "anim-righting");
      remove(turtle, "is-flipped");
      add(turtle, "is-upright");

      // escono testa e zampe
      add(turtle, "is-emerged");

      // dopo un attimo: si mette "in piedi" (umano-like)
      setTimeout(() => add(turtle, "is-standing"), 600);

      // blink twice
      setTimeout(() => add(turtle, "do-blink"), 1200);

      // bocca + bubble "ho qualcosa per te"
      setTimeout(() => {
        add(turtle, "is-talking");
        add(bubble, "is-visible");
      }, 1900);

      // bubble scompare
      setTimeout(() => {
        remove(bubble, "is-visible");
        remove(turtle, "is-talking");
      }, 3700);

      // prende cartello + confetti
      setTimeout(() => {
        add(banner, "is-visible");
        add(banner, "do-confetti");
        add(turtle, "is-holdingBanner");
      }, 4200);
    }

    // Fine blink: rimuovo classe per evitare loop
    if (name === "blinkTwice") {
      remove(turtle, "do-blink");
    }

    // Fine confetti: stoppo la classe (resta banner)
    if (name === "confettiBurst") {
      remove(banner, "do-confetti");
    }
  });
})();

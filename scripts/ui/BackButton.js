class BackButton extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({
            mode: "open"
        });

        shadow.innerHTML = `
            <style>

                .back-button {
                    position: absolute;
                    top: 22px;
                    left: 22px;

                    width: 52px;
                    height: 52px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 0;

                    color: #f5f3ff;

                    background:
                    linear-gradient(
                        145deg,
                        #1b2344,
                        #10172f
                    );

                    border: 1px solid rgba(180, 190, 255, 0.25);
                    border-radius: 15px;

                    box-shadow:
                        0 8px 20px rgba(0, 0, 0, 0.35),
                        0 0 18px rgba(110, 100, 220, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.10);

                    cursor: pointer;

                    transition:
                        background 0.2s ease,
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        transform 0.2s ease;

                    outline: none;
                }

                .arrow {
                    width: 12px;
                    height: 12px;

                    border-left: 3px solid #f5f3ff;
                    border-bottom: 3px solid #f5f3ff;

                    transform: rotate(45deg);

                    margin-left: 5px;

                    filter:
                        drop-shadow(
                            0 2px 4px rgba(0, 0, 0, 0.6)
                        );

                    transition:
                        transform 0.2s ease,
                        filter 0.2s ease;
                }

                .back-button:hover {
                background:
                    linear-gradient(
                        145deg,
                        #29325b,
                        #171f3d
                    );

                border-color:
                    rgba(180, 170, 255, 0.45);

                box-shadow:
                    0 10px 25px rgba(0, 0, 0, 0.45),
                    0 0 25px rgba(120, 110, 240, 0.22),
                    inset 0 1px 0 rgba(255, 255, 255, 0.14);

                transform: translateX(-2px);
                }

                .back-button:hover .arrow {
                    transform:
                        translateX(-3px)
                        rotate(45deg);

                    filter:
                        drop-shadow(
                            0 0 5px rgba(180, 170, 255, 0.7)
                        );
                }

                .back-button:active {
                    transform:
                        translateX(-1px)
                        scale(0.94);

                    box-shadow:
                        0 5px 12px rgba(0, 0, 0, 0.35),
                        0 0 15px rgba(120, 110, 240, 0.15);
                }

            </style>

            <button
                class="back-button"
                aria-label="Voltar"
                title="Voltar"
            >
                <span class="arrow"></span>
            </button>
        `;

        const button =
            shadow.querySelector(".back-button");

        button.addEventListener("click", () => {

            this.dispatchEvent(
                new CustomEvent("back", {
                    bubbles: true
                })
            );

        });
    }
}

customElements.define(
    "back-button",
    BackButton
);
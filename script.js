/* =========================================================
        ADVANCED EXTENDED EUCLIDEAN ALGORITHM
========================================================= */


/* ================= DOM ================= */

const numberA =
    document.getElementById("numberA");

const numberB =
    document.getElementById("numberB");

const calculateBtn =
    document.getElementById("calculateBtn");

const gcdResult =
    document.getElementById("gcdResult");

const xResult =
    document.getElementById("xResult");

const yResult =
    document.getElementById("yResult");

const identityEquation =
    document.getElementById("identityEquation");

const divisionSteps =
    document.getElementById("divisionSteps");

const substitutionSteps =
    document.getElementById("substitutionSteps");

const coefficientSteps =
    document.getElementById("coefficientSteps");

const consoleBox =
    document.getElementById("console");


/* ================= CLICK ================= */

calculateBtn.addEventListener(
    "click",
    calculateAlgorithm
);


/* ================= MAIN FUNCTION ================= */

function calculateAlgorithm() {

    let a = Number(numberA.value);

    let b = Number(numberB.value);


    if (!Number.isInteger(a) ||
        !Number.isInteger(b)) {

        alert("Please enter two integers.");

        return;
    }


    if (a === 0 && b === 0) {

        alert("Both numbers cannot be zero.");

        return;
    }


    a = Math.abs(a);

    b = Math.abs(b);


    clearResults();


    log("Starting Extended Euclidean Algorithm...");

    log("Input A = " + a);

    log("Input B = " + b);


    const result =
        extendedEuclidean(a, b);


    gcdResult.textContent =
        result.gcd;

    xResult.textContent =
        result.x;

    yResult.textContent =
        result.y;


    identityEquation.textContent =

        `${a}(${result.x}) + ${b}(${result.y}) = ${result.gcd}`;


    showDivisionSteps(
        result.steps
    );


    showSubstitutionSteps(
        result.steps
    );


    showCoefficientSteps(
        result
    );


    log("Algorithm Completed.");

}


/* =========================================================
        EXTENDED EUCLIDEAN ALGORITHM
========================================================= */

function extendedEuclidean(a, b) {

    let oldR = a;
    let r = b;

    let oldS = 1;
    let s = 0;

    let oldT = 0;
    let t = 1;


    const steps = [];


    while (r !== 0) {

        const quotient =
            Math.floor(oldR / r);

        const remainder =
            oldR % r;


        steps.push({

            dividend: oldR,

            divisor: r,

            quotient: quotient,

            remainder: remainder,

            s: oldS,

            t: oldT

        });


        const tempR = r;

        r = oldR - quotient * r;

        oldR = tempR;


        const tempS = s;

        s = oldS - quotient * s;

        oldS = tempS;


        const tempT = t;

        t = oldT - quotient * t;

        oldT = tempT;

    }


    return {

        gcd: oldR,

        x: oldS,

        y: oldT,

        steps: steps

    };

}


/* =========================================================
        DISPLAY DIVISION STEPS
========================================================= */

function showDivisionSteps(steps) {

    divisionSteps.innerHTML = "";


    steps.forEach(

        (step, index) => {

            const div =

                document.createElement("div");


            div.className = "step";


            div.innerHTML = `

                <strong>
                    Step ${index + 1}
                </strong>

                <br><br>

                ${step.dividend}

                =

                ${step.divisor}

                ×

                ${step.quotient}

                +

                ${step.remainder}

                <br><br>

                <span style="color:#94a3b8">

                ${step.remainder === 0

                    ? "The remainder is zero, so the previous divisor is the GCD."

                    : "Continue with the divisor and remainder."

                }

                </span>

            `;


            divisionSteps.appendChild(div);

        }

    );

}


/* =========================================================
        BACK SUBSTITUTION
========================================================= */

function showSubstitutionSteps(steps) {

    substitutionSteps.innerHTML = "";


    const usefulSteps =
        steps.filter(

            step => step.remainder !== 0

        );


    if (usefulSteps.length === 0) {

        substitutionSteps.innerHTML =

            `<div class="empty">
                No substitution required.
            </div>`;

        return;

    }


    for (

        let i = usefulSteps.length - 1;

        i >= 0;

        i--

    ) {

        const step =
            usefulSteps[i];


        const div =
            document.createElement("div");


        div.className =
            "step";


        div.innerHTML = `

            <strong>

                Back Substitution ${

                    usefulSteps.length - i

                }

            </strong>

            <br><br>

            ${step.remainder}

            =

            ${step.dividend}

            −

            (${step.quotient}

            ×

            ${step.divisor})

        `;


        substitutionSteps.appendChild(div);

    }

}


/* =========================================================
        COEFFICIENT STEPS
========================================================= */

function showCoefficientSteps(result) {

    coefficientSteps.innerHTML = "";


    const div =
        document.createElement("div");


    div.className =
        "step";


    div.innerHTML = `

        <strong>

            Bézout Coefficients

        </strong>

        <br><br>

        x =

        <code>

            ${result.x}

        </code>

        <br><br>

        y =

        <code>

            ${result.y}

        </code>

        <br><br>

        Therefore:

        <br><br>

        <code>

        ax + by = gcd(a,b)

        </code>

    `;


    coefficientSteps.appendChild(div);

}


/* =========================================================
        CLEAR RESULTS
========================================================= */

function clearResults() {

    gcdResult.textContent = "—";

    xResult.textContent = "—";

    yResult.textContent = "—";


    identityEquation.textContent =

        "ax + by = gcd(a,b)";


    divisionSteps.innerHTML = "";

    substitutionSteps.innerHTML = "";

    coefficientSteps.innerHTML = "";


    consoleBox.innerHTML =

        "> Euclidean Engine Initialized...";

}


/* =========================================================
        SYSTEM LOG
========================================================= */

function log(message) {

    const line =
        document.createElement("div");

    line.textContent =
        "> " + message;

    consoleBox.appendChild(line);

    consoleBox.scrollTop =
        consoleBox.scrollHeight;

}

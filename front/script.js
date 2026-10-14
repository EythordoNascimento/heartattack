/* =====================================================
   DADOS DEMONSTRATIVOS

   Estes dados são apenas para o dashboard funcionar
   enquanto a base real estiver sem registros.
===================================================== */

const sampleData = [

    {
        Age: 34,
        Sex: "Male",
        Cholesterol: 182,
        BloodPressure: "118/76",
        HeartRate: 68,
        Diabetes: "No",
        FamilyHistory: "No",
        Smoking: "No",
        Obesity: "No"
    },

    {
        Age: 42,
        Sex: "Female",
        Cholesterol: 205,
        BloodPressure: "126/80",
        HeartRate: 72,
        Diabetes: "No",
        FamilyHistory: "Yes",
        Smoking: "No",
        Obesity: "No"
    },

    {
        Age: 48,
        Sex: "Male",
        Cholesterol: 238,
        BloodPressure: "138/88",
        HeartRate: 79,
        Diabetes: "Yes",
        FamilyHistory: "Yes",
        Smoking: "Yes",
        Obesity: "Yes"
    },

    {
        Age: 55,
        Sex: "Female",
        Cholesterol: 226,
        BloodPressure: "142/90",
        HeartRate: 82,
        Diabetes: "No",
        FamilyHistory: "Yes",
        Smoking: "No",
        Obesity: "Yes"
    },

    {
        Age: 61,
        Sex: "Male",
        Cholesterol: 254,
        BloodPressure: "150/94",
        HeartRate: 86,
        Diabetes: "Yes",
        FamilyHistory: "Yes",
        Smoking: "Yes",
        Obesity: "Yes"
    },

    {
        Age: 39,
        Sex: "Female",
        Cholesterol: 190,
        BloodPressure: "120/78",
        HeartRate: 70,
        Diabetes: "No",
        FamilyHistory: "No",
        Smoking: "No",
        Obesity: "No"
    },

    {
        Age: 67,
        Sex: "Male",
        Cholesterol: 267,
        BloodPressure: "156/96",
        HeartRate: 91,
        Diabetes: "Yes",
        FamilyHistory: "Yes",
        Smoking: "Yes",
        Obesity: "Yes"
    },

    {
        Age: 52,
        Sex: "Female",
        Cholesterol: 218,
        BloodPressure: "134/84",
        HeartRate: 75,
        Diabetes: "No",
        FamilyHistory: "Yes",
        Smoking: "No",
        Obesity: "Yes"
    },

    {
        Age: 45,
        Sex: "Male",
        Cholesterol: 210,
        BloodPressure: "130/82",
        HeartRate: 77,
        Diabetes: "No",
        FamilyHistory: "No",
        Smoking: "Yes",
        Obesity: "No"
    },

    {
        Age: 58,
        Sex: "Female",
        Cholesterol: 231,
        BloodPressure: "144/88",
        HeartRate: 80,
        Diabetes: "Yes",
        FamilyHistory: "Yes",
        Smoking: "No",
        Obesity: "Yes"
    },

    {
        Age: 72,
        Sex: "Male",
        Cholesterol: 280,
        BloodPressure: "160/100",
        HeartRate: 94,
        Diabetes: "Yes",
        FamilyHistory: "Yes",
        Smoking: "Yes",
        Obesity: "Yes"
    },

    {
        Age: 42,
        Sex: "Female",
        Cholesterol: 204,
        BloodPressure: "128/82",
        HeartRate: 68,
        Diabetes: "No",
        FamilyHistory: "No",
        Smoking: "No",
        Obesity: "No"
    }

];


/* =====================================================
   VARIÁVEIS DOS GRÁFICOS
===================================================== */

let riskChart;

let sexChart;

let ageChart;


/* =====================================================
   FUNÇÃO PARA PEGAR ELEMENTOS
===================================================== */

const $ = (id) => {

    return document.getElementById(id);

};


/* =====================================================
   MÉDIA
===================================================== */

const avg = (arr) => {

    if (!arr.length) {
        return 0;
    }

    return arr.reduce(
        (a, b) => a + b,
        0
    ) / arr.length;

};


/* =====================================================
   NORMALIZAÇÃO DAS COLUNAS

   Permite que o sistema reconheça:

   Age
   Idade

   Cholesterol
   Colesterol

   etc.
===================================================== */

function normalizeKey(key) {

    return key
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");

}


/* =====================================================
   ENCONTRA UMA COLUNA
===================================================== */

function getValue(row, names) {

    const keys = Object.keys(row);

    const wanted = names.map(normalizeKey);

    const key = keys.find(
        k => wanted.includes(
            normalizeKey(k)
        )
    );

    return key
        ? row[key]
        : "";

}


/* =====================================================
   TRANSFORMA VALOR EM NÚMERO
===================================================== */

function parseNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return NaN;

    }

    const n = Number(

        String(value)
            .replace(",", ".")
            .replace(/[^\d.-]/g, "")

    );

    return Number.isFinite(n)
        ? n
        : NaN;

}


/* =====================================================
   VERIFICA SIM / YES
===================================================== */

function yes(value) {

    const v = String(value ?? "")
        .trim()
        .toLowerCase();

    return [

        "yes",
        "sim",
        "1",
        "true",
        "y"

    ].includes(v);

}


/* =====================================================
   PRESSÃO ARTERIAL
===================================================== */

function parsePressure(value) {

    const match =
        String(value ?? "")
            .match(/\d+(?:[.,]\d+)?/);

    return match
        ? parseNumber(match[0])
        : NaN;

}


/* =====================================================
   NORMALIZA OS DADOS
===================================================== */

function normalizeRows(rows) {

    return rows.map(r => ({

        Age: parseNumber(
            getValue(
                r,
                [
                    "Age",
                    "Idade"
                ]
            )
        ),

        Sex:
            getValue(
                r,
                [
                    "Sex",
                    "Sexo"
                ]
            ),

        Cholesterol:
            parseNumber(
                getValue(
                    r,
                    [
                        "Cholesterol",
                        "Colesterol"
                    ]
                )
            ),

        BloodPressure:
            getValue(
                r,
                [
                    "Blood Pressure",
                    "BloodPressure",
                    "Pressão arterial",
                    "Pressao arterial"
                ]
            ),

        HeartRate:
            parseNumber(
                getValue(
                    r,
                    [
                        "Heart Rate",
                        "HeartRate",
                        "Frequência cardíaca",
                        "Frequencia cardiaca"
                    ]
                )
            ),

        Diabetes:
            getValue(
                r,
                ["Diabetes"]
            ),

        FamilyHistory:
            getValue(
                r,
                [
                    "Family History",
                    "Historico familiar",
                    "Histórico familiar"
                ]
            ),

        Smoking:
            getValue(
                r,
                [
                    "Smoking",
                    "Tabagismo"
                ]
            ),

        Obesity:
            getValue(
                r,
                [
                    "Obesity",
                    "Obesidade"
                ]
            )

    })).filter(
        r =>
            Object.values(r).some(
                v =>
                    v !== "" &&
                    (
                        Number.isFinite(v) ||
                        yes(v)
                    )
            )
    );

}


/* =====================================================
   FORMATAÇÃO DE NÚMEROS
===================================================== */

function formatNumber(
    n,
    decimals = 0
) {

    return n.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }
    );

}


/* =====================================================
   CALCULA PORCENTAGEM
===================================================== */

function pct(rows, key) {

    if (!rows.length) {
        return 0;
    }

    return (

        rows.filter(
            r => yes(r[key])
        ).length

        /

        rows.length

    ) * 100;

}


/* =====================================================
   CRIA OS GRÁFICOS
===================================================== */

function createCharts(rows) {

    /* =========================
       DADOS
    ========================== */

    const ages =
        rows
            .map(r => r.Age)
            .filter(Number.isFinite);


    const cholesterol =
        rows
            .map(r => r.Cholesterol)
            .filter(Number.isFinite);


    const heart =
        rows
            .map(r => r.HeartRate)
            .filter(Number.isFinite);


    const pressure =
        rows
            .map(
                r =>
                    parsePressure(
                        r.BloodPressure
                    )
            )
            .filter(Number.isFinite);


    /* =========================
       FAIXAS DE IDADE
    ========================== */

    const ageBuckets = [

        ages.filter(
            a => a < 40
        ).length,

        ages.filter(
            a =>
                a >= 40 &&
                a < 50
        ).length,

        ages.filter(
            a =>
                a >= 50 &&
                a < 60
        ).length,

        ages.filter(
            a =>
                a >= 60 &&
                a < 70
        ).length,

        ages.filter(
            a => a >= 70
        ).length

    ];


    /* =========================
       FATORES DE RISCO
    ========================== */

    const riskLabels = [

        "Diabetes",

        "Tabagismo",

        "Obesidade",

        "Hist. familiar"

    ];


    const riskValues = [

        pct(rows, "Diabetes"),

        pct(rows, "Smoking"),

        pct(rows, "Obesity"),

        pct(rows, "FamilyHistory")

    ];


    /* =========================
       SEXO
    ========================== */

    const male =
        rows.filter(
            r =>
                String(r.Sex)
                    .toLowerCase()
                    .startsWith("m")
        ).length;


    const female =
        rows.filter(
            r =>
                String(r.Sex)
                    .toLowerCase()
                    .startsWith("f")
        ).length;


    const other =
        Math.max(
            0,
            rows.length -
            male -
            female
        );


    /* =========================
       DESTRÓI GRÁFICOS ANTIGOS
    ========================== */

    if (riskChart) {
        riskChart.destroy();
    }

    if (sexChart) {
        sexChart.destroy();
    }

    if (ageChart) {
        ageChart.destroy();
    }


    /* =========================
       GRÁFICO DE FATORES
    ========================== */

    riskChart = new Chart(
        $("riskChart"),
        {

            type: "bar",

            data: {

                labels: riskLabels,

                datasets: [

                    {

                        data: riskValues,

                        borderRadius: 6,

                        borderSkipped: false,

                        backgroundColor: [

                            "#8e7dff",

                            "#ff6e79",

                            "#ffb45b",

                            "#36a7ff"

                        ],

                        maxBarThickness: 28

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        callbacks: {

                            label: c =>
                                ` ${formatNumber(c.raw, 1)}%`

                        }

                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {

                            color: "#8195a9",

                            font: {
                                size: 9
                            }

                        }

                    },

                    y: {

                        beginAtZero: true,

                        max: 100,

                        grid: {

                            color:
                                "rgba(255,255,255,.06)"

                        },

                        ticks: {

                            color: "#8195a9",

                            callback:
                                value =>
                                    value + "%"

                        }

                    }

                }

            }

        }

    );


    /* =========================
       GRÁFICO DE SEXO
    ========================== */

    sexChart = new Chart(

        $("sexChart"),

        {

            type: "doughnut",

            data: {

                labels: [

                    "Masculino",

                    "Feminino",

                    "Outro"

                ],

                datasets: [

                    {

                        data: [

                            male,

                            female,

                            other

                        ],

                        backgroundColor: [

                            "#36a7ff",

                            "#8e7dff",

                            "#3dd7d0"

                        ],

                        borderWidth: 0,

                        hoverOffset: 4

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "73%",

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        }

    );


    /* =========================
       LEGENDA SEXO
    ========================== */

    $("sexTotal").textContent =
        rows.length;


    $("sexLegend").innerHTML = [

        [
            "#36a7ff",
            "Masculino",
            male
        ],

        [
            "#8e7dff",
            "Feminino",
            female
        ],

        [
            "#3dd7d0",
            "Outro",
            other
        ]

    ]

    .filter(
        x => x[2] > 0
    )

    .map(

        x => `

        <div class="legend-row">

            <i
                style="background:${x[0]}"
            ></i>

            <span>
                ${x[1]}
            </span>

            <strong>
                ${formatNumber(x[2])}
            </strong>

        </div>

        `

    ).join("");


    /* =========================
       GRÁFICO DE IDADE
    ========================== */

    ageChart = new Chart(

        $("ageChart"),

        {

            type: "line",

            data: {

                labels: [

                    "<40",

                    "40–49",

                    "50–59",

                    "60–69",

                    "70+"

                ],

                datasets: [

                    {

                        data: ageBuckets,

                        borderColor:
                            "#3dd7d0",

                        backgroundColor:
                            "rgba(61,215,208,.08)",

                        fill: true,

                        tension: .4,

                        pointRadius: 3,

                        pointBackgroundColor:
                            "#3dd7d0"

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: "#8195a9"
                        }

                    },

                    y: {

                        beginAtZero: true,

                        grid: {

                            color:
                                "rgba(255,255,255,.06)"

                        },

                        ticks: {

                            color: "#8195a9",

                            precision: 0

                        }

                    }

                }

            }

        }

    );


    /* =========================
       MÉDIAS
    ========================== */

    const aChol =
        avg(cholesterol);


    const aHeart =
        avg(heart);


    const aPressure =
        avg(pressure);


    /* =========================
       ATUALIZA CARDS
    ========================== */

    $("mPatients").textContent =
        formatNumber(rows.length);


    $("mAge").innerHTML =

        `${formatNumber(
            avg(ages),
            1
        )}

        <em>
            anos
        </em>`;


    $("mChol").innerHTML =

        `${formatNumber(
            aChol,
            0
        )}

        <em>
            mg/dL
        </em>`;


    $("mHeart").innerHTML =

        `${formatNumber(
            aHeart,
            0
        )}

        <em>
            bpm
        </em>`;


    /* =========================
       INDICADORES CLÍNICOS
    ========================== */

    $("cChol").innerHTML =

        `${formatNumber(
            aChol,
            0
        )}

        <small>
            mg/dL
        </small>`;


    $("cPressure").innerHTML =

        `${formatNumber(
            aPressure,
            0
        )}

        <small>
            mmHg
        </small>`;


    $("cHeart").innerHTML =

        `${formatNumber(
            aHeart,
            0
        )}

        <small>
            bpm
        </small>`;


    /* =========================
       BARRAS
    ========================== */

    $("pChol").style.width =

        Math.min(
            100,
            aChol / 300 * 100
        ) + "%";


    $("pPressure").style.width =

        Math.min(
            100,
            aPressure / 200 * 100
        ) + "%";


    $("pHeart").style.width =

        Math.min(
            100,
            aHeart / 140 * 100
        ) + "%";


    /* =========================
       FATORES MODIFICÁVEIS
    ========================== */

    const mod = (

        pct(rows, "Diabetes")

        +

        pct(rows, "Smoking")

        +

        pct(rows, "Obesity")

    ) / 3;


    $("modifiable").textContent =

        formatNumber(
            mod,
            0
        ) + "%";

}


/* =====================================================
   CARREGAR DADOS
===================================================== */

function loadData(
    rows,
    demo = false
) {

    const normalized =
        normalizeRows(rows);


    if (!normalized.length) {

        alert(
            "Não foram encontrados dados preenchidos no CSV."
        );

        return;

    }


    createCharts(
        normalized
    );


    $("dataStatus").innerHTML = `

        <span
            class="status-dot"
            style="
                background:
                ${demo
                    ? "var(--orange)"
                    : "var(--green)"};
            "
        ></span>

        <span>
            ${demo
                ? "Modo demonstrativo"
                : "CSV carregado"}
        </span>

    `;


    $("mPatientsDelta").textContent =

        demo
            ? "amostra demonstrativa"
            : "dados importados do CSV";


    $("notice").style.display =

        demo
            ? "flex"
            : "none";

}


/* =====================================================
   LEITOR DE CSV
===================================================== */

function parseCSV(text) {

    const lines =
        text
            .split(/\r?\n/)
            .filter(
                line =>
                    line.trim() !== ""
            );


    if (lines.length < 2) {

        return [];

    }


    /* Detecta , ou ; */

    const delimiter =
        lines[0].includes(";")
            ? ";"
            : ",";


    /* Cabeçalho */

    const headers =
        lines[0]
            .split(delimiter)
            .map(
                h =>
                    h
                        .trim()
                        .replace(
                            /^"|"$/g,
                            ""
                        )
            );


    /* Linhas */

    return lines
        .slice(1)
        .map(line => {

            const values = [];

            let current = "";

            let quoted = false;


            for (
                let i = 0;
                i < line.length;
                i++
            ) {

                const char =
                    line[i];


                if (
                    char === '"'
                ) {

                    quoted =
                        !quoted;

                }

                else if (
                    char === delimiter &&
                    !quoted
                ) {

                    values.push(
                        current
                            .trim()
                            .replace(
                                /^"|"$/g,
                                ""
                            )
                    );

                    current = "";

                }

                else {

                    current += char;

                }

            }


            values.push(
                current
                    .trim()
                    .replace(
                        /^"|"$/g,
                        ""
                    )
            );


            const row = {};


            headers.forEach(
                (header, index) => {

                    row[header] =
                        values[index] ?? "";

                }
            );


            return row;

        });

}


/* =====================================================
   BOTÃO CARREGAR CSV
===================================================== */

$("csvInput").addEventListener(

    "change",

    async (event) => {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        const text =
            await file.text();


        const data =
            parseCSV(text);


        loadData(
            data,
            false
        );

    }

);


/* =====================================================
   BOTÃO DADOS DEMONSTRATIVOS
===================================================== */

$("demoBtn").addEventListener(

    "click",

    () => {

        loadData(
            sampleData,
            true
        );

    }

);


/* =====================================================
   FECHAR AVISO
===================================================== */

$("closeNotice").addEventListener(

    "click",

    () => {

        $("notice").style.display =
            "none";

    }

);


/* =====================================================
   INICIA O DASHBOARD
===================================================== */

loadData(
    sampleData,
    true
);
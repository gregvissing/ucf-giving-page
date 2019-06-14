export const giftTypeValues = {
    onetime: {
        label: "Right Now",
        color: "#dd0031"
    },
    disabled: {
        label: "-- OR --",
        color: "#ffffff"
    },
    monthly: {
        label: "Monthly",
        color: "#fdcd3d"
    },
}

export const amounts = [{
        text: "$50",
        value: "50"
    },
    {
        text: "$100",
        value: "100"
    },
    {
        text: "$250",
        value: "250"
    },
    {
        text: "$500",
        value: "500"
    },
    {
        text: "$1000",
        value: "1000"
    }
    // {
    //     text: "Other Amount",
    //     value: "other",
    // }
];

export const giftTypes = [{
        text: "One-Time Gift",
        value: "onetime"
    },
    {
        text: "Monthly Gift",
        value: "monthly"
    },
    {
        text: "Pledge Payment",
        value: "pledge"
    },
    {
        text: "Faculty & Staff",
        value: "facultyStaff"
    },
    {
        text: "Senior Class Gift",
        value: "seniorClass"
    }
];

export const giftDetailSteps = [{
    step: "amount",
    text: "How much will you give?"
}, {
    step: "type",
    text: "How often will you give?"
}, {
    step: "tribute",
    text: "Is this gift in honor or memory of a person or pet?"
}, {
    step: "comments",
    text: "Special Instructions / Comments?"
}];

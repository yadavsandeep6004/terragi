import { ListingDetailsType } from "../../containers/home-section/quick-search";
// import dlf5 from "../../assets/images/dlf_5.png";
// import dlf9 from "../../assets/images/dlf_9.png";
import dlf1 from "../../assets/images/dlf_1.png";
import east from "../../assets/images/east.png";
import floor4 from "../../assets/images/4th.png";
import bhk4 from "../../assets/images/4_bhk.png";
import floor1 from "../../assets/images/firstfloor.png";
import north from "../../assets/images/NF.png";
import bhk3 from "../../assets/images/Threebhk.png";
import vikas from "../../assets/images/VIKAS.png";
import delite from "../../assets/images/del.png";
import billionaire from "../../assets/images/bill.png";
import onepointfive from "../../assets/images/onepointfivecr.png";

export const ListingDetails: ListingDetailsType[] = [
    {
        title: "Floor",
        label: "First",
        value: "1",
        picTitle: floor1,
        type: "floors",
    },
    // {
    //     title: "Plot Size",
    //     label: "300 sq yard",
    //     value: 300,
    //     picTitle: sq300,
    //     type: "plotSize",
    // },
    // {
    //     title: "Plot Size",
    //     label: "500 sq yard",
    //     value: 500,
    //     picTitle: sq500,
    //     type: "plotSize",
    // },
    {
        title: "Facing",
        label: "North",
        value: "FN",
        picTitle: north,
        type: "facing",
    },
    {
        title: "Facing",
        label: "East",
        value: "FE",
        picTitle: east,
        type: "facing",
    },
    {
        title: "BHK",
        label: "3 BHK",
        value: 3,
        picTitle: bhk3,
        type: "bhk",
    },
    {
        title: "BHK",
        label: "4 BHK",
        value: 4,
        picTitle: bhk4,
        type: "bhk",
    },
    // {
    //     title: "Floor",
    //     label: "First",
    //     value: "1",
    //     picTitle: floor1,
    //     type: "floors",
    // },
    {
        title: "Floor",
        label: "Fourth",
        value: "4",
        picTitle: floor4,
        type: "floors",
    },
    {
        title: "Locality",
        label: "DLF Phase 1",
        value: "DLF Phase 1",
        picTitle: dlf1,
        type: "localities",
    },
    // {
    //     title: "Locality",
    //     label: "DLF Phase 5",
    //     value: "DLF Phase 5",
    //     picTitle: dlf5,
    //     type: "localities",
    // },
    {
        title: "Pricing",
        label: "1.5 cr onwards",
        value: "15000000",
        picTitle: onepointfive,
        type: "minPrice",
    },
    // {
    //     title: "Builder",
    //     label: "DLF",
    //     value: [
    //         "DLF EXCLUSIVE Floors Private Limited",
    //         "DLF Exclusive FLOORS Private Limited",
    //         "DLF Exclusive Floors Private Limited",
    //     ],
    //     picTitle: dlf9,
    //     type: "builderName",
    // },
    {
        title: "Builder",
        label: "VIKAS BUILDERS",
        value: "VIKAS BUILDERS",
        picTitle: vikas,
        type: "builderName",
    },
    {
        title: "Builder",
        label: "DELITE ROYALE HOMES",
        value: "DELITE ROYALE HOMES",
        picTitle: delite,
        type: "builderName",
    },
    {
        title: "Builder",
        label: "BILLIONAIRE HOMES",
        value: "BILLIONAIRE HOMES",
        picTitle: billionaire,
        type: "builderName",
    },
];

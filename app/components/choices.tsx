// app/choices.ts

export interface ChoiceType {
    name: string;
    img: string;
    description: string;
    type:string;
    level:number;
  }
  
  export const choices: ChoiceType[] = [
    { name: "グー", img: "/rock.png", description: "ふつうのグー" ,type:"rock" , level:0},
    { name: "チョキ", img: "/scissors.png", description: "ふつうのチョキ",type:"scissors",level:0 },
    { name: "パー", img: "/paper.png", description: "ふつうのパー", type:"paper", level:0 },
    { name: "金の玉", img: "/kintama.png", description: "高位のグー。グーに勝つ",type:"rock",level:1 },
    { name: "ザリガニ", img: "/zari.png", description: "高位のチョキ。チョキに勝つ",type:"scissors",level:1 },
    { name: "札", img: "/money.png", description: "高位のパー。パーに勝つ",type:"paper",level:1 },
    { name: "隕石", img: "/meteor.png", description: "最高位のグー。他のグー系に勝つ",type:"rock",level:2 },
    { name: "村正", img: "/muramasa.png", description: "最高位のチョキ。他のチョキ系に勝つ",type:"scissors",level:2 },
    { name: "エロ本", img: "/erohon.png", description: "最高位のパー。他のパー系に勝つ",type:"paper",level:2 },
    { name: "バリアー", img: "/barrier.png", description: "どの手ともあいこになる", type:"other", level:0 }

  ];
  
  export type Choice = typeof choices[number]["name"];
  
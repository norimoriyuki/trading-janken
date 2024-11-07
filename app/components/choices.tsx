// app/choices.ts

export interface ChoiceType {
    name: string;
    img: string;
    description: string;
  }
  
  export const choices: ChoiceType[] = [
    { name: "グー", img: "/rock.png", description: "グーはチョキに勝ちます。" },
    { name: "チョキ", img: "/scissors.png", description: "チョキはパーに勝ちます。" },
    { name: "パー", img: "/paper.png", description: "パーはグーに勝ちます。" },
    { name: "バリアー", img: "/barrier.png", description: "バリアーはどの手ともあいこになります。" },
  ];
  
  export type Choice = typeof choices[number]["name"];
  
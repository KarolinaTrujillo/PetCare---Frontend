export type IconType = "perro" | "gato" | "ave" | "otro";

export interface MascotaUI {
  id: string;
  nombre: string;
  icon: IconType;
  especie: "PERRO" | "GATO" | "AVE" | "OTRO";
  edad: number;
}
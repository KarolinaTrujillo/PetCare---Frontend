import { ClienteMascotaDetallePage } from "@/modules/mascota-cliente-detalle/view/ClienteMascotaDetallePage";

interface Props {
  params: {
    mascotaId: string;
  };
}

export default function Page({ params }: Props) {
  return <ClienteMascotaDetallePage mascotaId={params.mascotaId} />;
}

import { Personal } from '../entities/personal.entity'

interface IPersonalService {
  getVeterinarios: () => Promise<Personal[]>
  getAdmins: () => Promise<Personal[]>
}

export class GetPersonalUseCase {
  constructor(private readonly service: IPersonalService) {}

  async execute(): Promise<Personal[]> {
    const [vets, admins] = await Promise.all([
      this.service.getVeterinarios(),
      this.service.getAdmins(),
    ])
    return [...admins, ...vets]
  }
}
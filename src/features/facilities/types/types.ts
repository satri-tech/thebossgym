import { CreateFacilitiesInput, UpdateFacilitiesInput } from "@/core/validators/facilities.validator";

export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
}

export type CreateFacilityInput = CreateFacilitiesInput;
export type UpdateFacilityInput = UpdateFacilitiesInput;





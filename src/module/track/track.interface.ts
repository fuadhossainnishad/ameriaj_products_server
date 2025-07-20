import { Document } from "mongoose";

export interface IMedpro {
  name: string;
  date: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export enum TQualificationLevel {
  marksman = "marksman",
  sharpshooter = "sharpshooter",
  expert = "expert",
}
export interface IWeaponQualification extends IMedpro {
  pass: boolean;
  score: number;
  qualificationLevel: TQualificationLevel;
}
export interface IPhysicalFitness
  extends Omit<"IWeaponQualification", "qualification" | "score"> {}
export interface IRangeQualification
  extends Omit<"IWeaponQualification", "pass"> {}

export interface ICounseling extends IMedpro {
  nextDate: Date;
  counseledBy: string;
  notes: string;
}
export interface IAdminUser extends Omit<IMedpro, "name" | "date"> {
  lesCorrect: boolean;
  vehicleRegistration: string;
  vehicleInsurance: string;
  educationMilitary: string;
  educationCivilian: string;
  volunteerHour: number;
}

export interface IRecentActivity extends Document {
  title: string;
}

export interface IReport extends Document {
  title: string;
}

export type TAdminUpdate = Partial<IAdmin> & {
  adminId: string;
};

import { z } from 'zod';

// Participant schema for creation
export const createParticipantSchema = z.object({
  participantId: z.string().describe('Unique participant ID'),
  firstName: z.string().describe('First name'),
  lastName: z.string().optional().describe('Last name'),
  dateOfBirth: z.string().optional().describe('Date of birth (YYYY-MM-DD format)'),
  homeAddress: z.string().optional().describe('Home address'),
  mobileNumber: z.string().optional().describe('Mobile phone number'),
  email: z.string().optional().describe('Email address'),
  benefitsReceiving: z.string().optional().describe('Benefits currently receiving'),
  onProbation: z.boolean().optional().describe('Is the participant on probation'),
  isVeteran: z.boolean().optional().describe('Is the participant a veteran'),
  relationshipStatus: z.string().optional().describe('Relationship status'),
  sexAtBirth: z.string().optional().describe('Sex at birth'),
  genderIdentity: z.string().optional().describe('Gender identity'),
  ethnicity: z.string().optional().describe('Ethnicity'),
  race: z.string().optional().describe('Race'),
  preferredLanguage: z.string().optional().describe('Preferred language'),
  monthlyIncome: z.number().optional().describe('Monthly income amount'),
  occupation: z.string().optional().describe('Occupation'),
});

// Household dependent schema for creation
export const createHouseholdDependentSchema = z.object({
  participantId: z.string().describe('The unique participant ID'),
  firstName: z.string().describe('Dependent first name'),
  lastName: z.string().optional().describe('Dependent last name'),
  age: z.number().optional().describe('Age of the dependent'),
  dateOfBirth: z.string().optional().describe('Date of birth (YYYY-MM-DD format) - can be placeholder if unknown'),
  relationship: z.string().optional().describe('Relationship to participant (e.g., "child", "spouse")'),
  sexAtBirth: z.string().optional().describe('Sex at birth'),
  genderIdentity: z.string().optional().describe('Gender identity'),
  ethnicity: z.string().optional().describe('Ethnicity'),
  race: z.string().optional().describe('Race'),
});

// WIC eligibility update schema for participants
export const updateParticipantWicInfoSchema = z.object({
  participantId: z.string().describe('The unique participant ID'),
  isPregnant: z.boolean().optional().describe('Is the participant pregnant'),
  isPostPartum: z.boolean().optional().describe('Is the participant postpartum'),
  isInfantBreastfeeding: z.boolean().optional().describe('Is the participant breastfeeding an infant'),
  isInfantFormula: z.boolean().optional().describe('Is the participant formula feeding an infant'),
  hasChildren0to5: z.boolean().optional().describe('Does the participant have children aged 0-5'),
  hasDependents: z.boolean().optional().describe('Does the participant have any dependents'),
});

// WIC eligibility update schema for dependents
export const updateDependentWicInfoSchema = z.object({
  dependentId: z.string().describe('The unique dependent ID'),
  age: z.number().optional().describe('Age of the dependent'),
  dateOfBirth: z.string().optional().describe('Date of birth (YYYY-MM-DD format)'),
  isInfant: z.boolean().optional().describe('Is the dependent an infant (under 1 year)'),
  isChild0to5: z.boolean().optional().describe('Is the dependent a child aged 0-5'),
});

// Demographic update schema for participants
export const updateParticipantDemographicsSchema = z.object({
  participantId: z.string().describe('The unique participant ID'),
  lastName: z.string().optional().describe('Last name'),
  dateOfBirth: z.string().optional().describe('Date of birth (YYYY-MM-DD format)'),
  homeAddress: z.string().optional().describe('Home address'),
  mobileNumber: z.string().optional().describe('Mobile phone number'),
  email: z.string().optional().describe('Email address'),
  benefitsReceiving: z.string().optional().describe('Benefits currently receiving'),
  onProbation: z.boolean().optional().describe('Is the participant on probation'),
  isVeteran: z.boolean().optional().describe('Is the participant a veteran'),
  relationshipStatus: z.string().optional().describe('Relationship status'),
  sexAtBirth: z.string().optional().describe('Sex at birth'),
  genderIdentity: z.string().optional().describe('Gender identity'),
  ethnicity: z.string().optional().describe('Ethnicity'),
  race: z.string().optional().describe('Race'),
  preferredLanguage: z.string().optional().describe('Preferred language'),
  monthlyIncome: z.number().optional().describe('Monthly income amount'),
  occupation: z.string().optional().describe('Occupation'),
});

// Search schemas
export const searchByNameSchema = z.object({
  name: z.string().describe('Full name (e.g., "Sarah Johnson") or partial name to search for'),
});

export const searchByLocationSchema = z.object({
  location: z.string().describe('City name or address part to search for (e.g., "Riverside", "Oak Street")'),
});

export const getParticipantByIdSchema = z.object({
  participantId: z.string().describe('The unique participant ID (e.g., WIC-SJ-2025-001)'),
});

export const getParticipantWithHouseholdSchema = z.object({
  participantId: z.string().describe('The unique participant ID'),
});

// Standard response schemas
export const participantResponseSchema = z.object({
  participant: z.any().nullable(),
  success: z.boolean(),
  error: z.string().optional(),
});

export const dependentResponseSchema = z.object({
  dependent: z.any().nullable(),
  success: z.boolean(),
  error: z.string().optional(),
});

export const participantSearchResponseSchema = z.object({
  participants: z.array(z.any()),
  count: z.number(),
});

export const participantWithHouseholdResponseSchema = z.object({
  participant: z.any().nullable(),
  household: z.array(z.any()),
  totalMembers: z.number(),
});

export const getParticipantByIdResponseSchema = z.object({
  participant: z.any().nullable(),
  found: z.boolean(),
});

// Type definitions for use in TypeScript
export type CreateParticipant = z.infer<typeof createParticipantSchema>;
export type CreateHouseholdDependent = z.infer<typeof createHouseholdDependentSchema>;
export type UpdateParticipantWicInfo = z.infer<typeof updateParticipantWicInfoSchema>;
export type UpdateDependentWicInfo = z.infer<typeof updateDependentWicInfoSchema>;
export type UpdateParticipantDemographics = z.infer<typeof updateParticipantDemographicsSchema>;
export type SearchByName = z.infer<typeof searchByNameSchema>;
export type SearchByLocation = z.infer<typeof searchByLocationSchema>;
export type GetParticipantById = z.infer<typeof getParticipantByIdSchema>;
export type GetParticipantWithHousehold = z.infer<typeof getParticipantWithHouseholdSchema>;
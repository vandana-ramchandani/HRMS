import { Request, Response } from "express";
import * as organizationService from "../services/superAdmin.services";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { handleError } from "../utils/helpers/ global.error.handler";


export const getAllOrganizations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pageSize = parseInt(req.query.pageSize as string);
    const pageNumber = parseInt(req.query.pageNumber as string);
    const organizations = await organizationService.fetchAllOrganizations(
      pageNumber,
      pageSize
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ORGS_FETCHED,
      timeStamp: new Date(),
      data: organizations,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getOrganizationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const organization = await organizationService.fetchOrganizationById(
      req.params.id
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ORG_FETCHED,
      timeStamp: new Date(),
      data: organization,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const createOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const organization = await organizationService.createNewOrganization(
      req.body
    );
    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.ORG_CREATED,
      timeStamp: new Date(),
      data: organization,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const organization = await organizationService.updateOrganizationById(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ORG_UPDATE,
      timeStamp: new Date(),
      data: organization,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await organizationService.deleteOrganizationById(req.params.id);
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.ORG_DELETED,
      timeStamp: new Date(),
    });
  } catch (error) {
    handleError(error, res);
  }
};

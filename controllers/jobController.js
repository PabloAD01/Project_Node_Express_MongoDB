import JobModel from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "job modified successfully", updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removeJob = await JobModel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removeJob });
};

export const showStats = async (req, res) => {
  let stats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ])
  
  stats= stats.reduce((acc, curr) => {
    
  })

  const defaultStats = {
    pending: 22,
    interview: 12,
    declined: 2,
  };
  let monthlyApplications = [
    {
      date: "May 23",
      count: 10,
    },
    {
      date: "Jun 23",
      count: 5,
    },
    {
      date: "Jul 23",
      count: 2,
    },
  ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};


import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AuthServices } from "./auth.service";

export class AuthControllers {
    static registerCustomer = catchAsync(async (req, res) => {
        const data = await AuthServices.registerCustomer(req.body);

        sendResponse(res, 201, true, 'User registered Successfully', data);
    });

    static loginCustomer = catchAsync(async (req, res) => {
        const result = await AuthServices.loginCustomer(req.body);

        const { refreshToken, accessToken } = result;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });

        const data = { token: accessToken };
        sendResponse(res, 200, true, 'Login successful', data);
    });

    static updateUser = catchAsync(async (req, res) => {
        const data = await AuthServices.updateUser(req.body);
        sendResponse(res, 200, true, 'User updated successfully', data);
    });
    static changePassword = catchAsync(async (req, res) => {
        const data = await AuthServices.changePassword(req.body);
        sendResponse(res, 200, true, 'Password updated successfully', data);
    });

    static getUsers = catchAsync(async (req, res) => {
        const data = await AuthServices.getAllUsers(req.query);
        sendResponse(res, 200, true, 'Users retrieved successfully', data);
    });
    static getSingleUser = catchAsync(async (req, res) => {
        const data = await AuthServices.getSingleUser(req.params.id);
        sendResponse(res, 200, true, 'User retrieved successfully', data);
    });

    static toggleUserBlock = catchAsync(async (req, res) => {
        const { id } = req.params;
        const { isBlocked } = req.body;
        
        const data = await AuthServices.toggleUserBlock(id, isBlocked);
        sendResponse(
            res,
            200,
            true,
            `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
            data,
        );
    });
}

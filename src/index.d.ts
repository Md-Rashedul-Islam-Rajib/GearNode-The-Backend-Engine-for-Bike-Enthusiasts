import { JwtPayload } from 'jsonwebtoken';
export interface CustomPayload extends JwtPayload {
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: CustomPayload;
            role?: CustomPayload;
        }
    }
}

// declare namespace ms {
//     // Unit, UnitAnyCase, and StringValue are backported from ms@3
//     // https://github.com/vercel/ms/blob/8b5923d1d86c84a9f6aba8022d416dcf2361aa8d/src/index.ts

//     type Unit =
//         | 'Years'
//         | 'Year'
//         | 'Yrs'
//         | 'Yr'
//         | 'Y'
//         | 'Weeks'
//         | 'Week'
//         | 'W'
//         | 'Days'
//         | 'Day'
//         | 'D'
//         | 'Hours'
//         | 'Hour'
//         | 'Hrs'
//         | 'Hr'
//         | 'H'
//         | 'Minutes'
//         | 'Minute'
//         | 'Mins'
//         | 'Min'
//         | 'M'
//         | 'Seconds'
//         | 'Second'
//         | 'Secs'
//         | 'Sec'
//         | 's'
//         | 'Milliseconds'
//         | 'Millisecond'
//         | 'Msecs'
//         | 'Msec'
//         | 'Ms';

//     type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

//     type StringValue =
//         | `${number}`
//         | `${number}${UnitAnyCase}`
//         | `${number} ${UnitAnyCase}`;
// }

export {};

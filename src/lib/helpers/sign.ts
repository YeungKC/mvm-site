import { ethers } from 'ethers';
import { REGISTRY_PID, STORAGE_ADDRESS, WITHDRAWAL_BOT } from '../constants/common';

const getWithdrawalAction = (destination: string, tag: string, amount: string): string => {
	const action = {
		receivers: [WITHDRAWAL_BOT],
		threshold: 1,
		extra: JSON.stringify({
			destination,
			tag,
			amount
		}),
	};
	return JSON.stringify(action);
};

export const getWithdrawalExtra = async (
	destination: string,
	tag: string,
	amount: string,
) => {
	const action = getWithdrawalAction(destination, tag, amount);
	const value = Buffer.from(action).toString('hex');
	const hash = ethers.utils.keccak256(`0x${value}`).slice(2);
	return `0x${REGISTRY_PID}${STORAGE_ADDRESS.toLowerCase().slice(2)}${hash}${value}`;
};

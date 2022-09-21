import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfoType } from '@/types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export const userState = atom<UserInfoType | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userStateSelector = selector({
  key: 'userStateSelector',
  get: async ({ get }) => {
    // 유저 정보 api 호출
  },
});

export type PrevisionDto = {
    nextSixHours: Array<number>;
    previsions: Array<number>;
  };

  export type PrevisionDtoKeys = keyof PrevisionDto;

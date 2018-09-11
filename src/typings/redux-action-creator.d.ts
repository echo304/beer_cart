declare type Action<T extends (...args: any[]) => any> = ReturnType<T>;

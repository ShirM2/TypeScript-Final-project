import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectDemo = () => (
    <Select.Root>
        <Select.Trigger
            className="flex w-full h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-gray-900 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-gray-500"
            aria-label="Study Field"
        >
            <Select.Value placeholder="בחר תחום התעניינות..." />
            <Select.Icon className="text-gray-900">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-900">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-[5px]">
                    <Select.Group>
                        <Select.Label className="px-[25px] text-xs leading-[25px] text-gray-500">
                            תחומי לימוד
                        </Select.Label>
                        <SelectItem value="computer-science">מדעי המחשב</SelectItem>
                        <SelectItem value="software-engineering">הנדסת תוכנה</SelectItem>
                        <SelectItem value="information-systems">מערכות מידע</SelectItem>
                        <SelectItem value="data-science">מדע הנתונים</SelectItem>
                        <SelectItem value="cyber-security">סייבר ואבטחת מידע</SelectItem>
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-900">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);

const SelectItem = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className={classnames(
                "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-gray-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-500 data-[disabled]:text-gray-400 data-[highlighted]:text-white data-[highlighted]:outline-none",
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export default SelectDemo;

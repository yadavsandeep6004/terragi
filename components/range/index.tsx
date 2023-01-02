/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from "react";
import {
    Slider,
    Rail,
    Handles,
    Tracks,
    Ticks,
    GetRailProps,
    GetHandleProps,
    GetTrackProps,
    SliderItem,
} from "react-compound-slider";

import TickIcon from "../../assets/icon/tick.svg";
import { FontType, Text } from "../text";

const sliderStyle = {
    position: "relative" as "relative",
    width: "100%",
};

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
    // position: "absolute" as "absolute",
    width: "100%",
    height: 0,
    // transform: "translate(0%, -50%)",
    borderRadius: 7,
    cursor: "pointer",
};

const railInnerStyle = {
    position: "absolute" as "absolute",
    width: "100%",
    height: 5,
    transform: "translate(0%, -50%)",
    borderRadius: 7,
    pointerEvents: "none" as "none",
    backgroundColor: "#EBF1FD",
};

interface SliderRailProps {
    getRailProps: GetRailProps;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
    <>
        <div style={railOuterStyle} {...getRailProps()} />
        <div style={railInnerStyle} />
    </>
);

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
    domain: number[];
    handle: SliderItem;
    getHandleProps: GetHandleProps;
    disabled?: boolean;
}

export const Handle: React.FC<HandleProps> = ({
    domain: [min, max],
    handle: { id, value, percent },
    getHandleProps,
}) => (
    <>
        <div
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                left: `${percent}%`,
                position: "absolute",
                transform: "translate(-50%, -50%)",
                WebkitTapHighlightColor: "rgba(0,0,0,0)",
                zIndex: 5,
                width: 24,
                height: 24,
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: "#3975EA",
                border: "2.5px solid #fff",
                boxShadow:
                    "0px 2px 2px rgba(50, 50, 71, 0.06), 0px 2px 4px rgba(50, 50, 71, 0.06)",
            }}
            {...getHandleProps(id)}
        >
            <TickIcon width="12" />
        </div>
    </>
);

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export const KeyboardHandle: React.FC<HandleProps> = ({
    domain: [min, max],
    handle: { id, value, percent },
    disabled = false,
    getHandleProps,
}) => (
    <button
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
            left: `${percent}%`,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            width: 24,
            height: 24,
            borderRadius: "50%",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
            backgroundColor: disabled ? "#666" : "#9BBFD4",
        }}
        {...getHandleProps(id)}
    />
);

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface TrackProps {
    source: SliderItem;
    target: SliderItem;
    getTrackProps: GetTrackProps;
    disabled?: boolean;
}

export const Track: React.FC<TrackProps> = ({
    source,
    target,
    getTrackProps,
    disabled = false,
}) => (
    <div
        style={{
            position: "absolute",
            transform: "translate(0%, -50%)",
            height: 5,
            zIndex: 1,
            backgroundColor: disabled ? "#999" : "#3975EA",
            borderRadius: 7,
            cursor: "pointer",
            left: `${source.percent}%`,
            width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps()}
    />
);

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
    tick: SliderItem;
    count: number;
    format?: (val: number) => string;
}

export const Tick: React.FC<TickProps> = ({
    tick,
    count,
    format = (d) => d,
}) => (
    <Text
        font={FontType.LABEL_M}
        weight={400}
        style={{
            position: "absolute",
            marginTop: 22,
            textAlign: "center",
            marginLeft: +tick.value === 0 ? 0 : `${-(100 / count) / 2}%`,
            left: `${tick.percent}%`,

            color: "#999999",
        }}
    >
        {format(tick.value)}
    </Text>
);

// @ts-ignore
export const Range = (props) => {
    const onUpdate = (value: ReadonlyArray<number>) => {
        const fakeE = { target: { name: props.name, value } };
        const fakeD = { name: props.name, value };
        props.setUpdate?.(fakeE, fakeD);
    };

    const onChange = (value: ReadonlyArray<number>) => {
        const fakeE = { target: { name: props.name, value } };
        const fakeD = { name: props.name, value };
        props.setValues?.(fakeE, fakeD);
    };

    const onSlideEnd = (value: ReadonlyArray<number>) => {
        const fakeE = { target: { name: props.name, value } };
        const fakeD = { name: props.name, value };
        props.onSlideEnd?.(fakeE, fakeD);
    };

    const { domain } = props;

    return (
        <div style={{ height: 50 }}>
            <Slider
                mode={3}
                step={1_000_000}
                rootStyle={sliderStyle}
                onUpdate={onUpdate}
                onChange={onChange}
                onSlideEnd={onSlideEnd}
                domain={domain}
                values={props.values}
            >
                <Rail>
                    {({ getRailProps }) => (
                        <SliderRail getRailProps={getRailProps} />
                    )}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map((handle) => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={props.domain}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks left={false} right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                            {tracks.map(({ id, source, target }) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                <Ticks count={10}>
                    {({ ticks }) => (
                        <div className="slider-ticks">
                            {ticks.map((tick) => (
                                <Tick
                                    key={tick.id}
                                    tick={tick}
                                    count={ticks.length}
                                    format={props.format}
                                />
                            ))}
                        </div>
                    )}
                </Ticks>
            </Slider>
        </div>
    );
};

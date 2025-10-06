'use client';

import React from "react";

interface AnimatedBtn1Props {
  action: () => void;
  children: React.ReactNode;
}

export default function AnimatedBtn1({ action, children }: AnimatedBtn1Props) {
  return (
    <div className="flex items-center justify-center">
      <button onClick={action} className="bubbleeffectbtn" type="button">
        <style>{`
          .bubbleeffectbtn {
            min-width: 100px;
            height: 30px;
            color: var(--primary-foreground);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            outline: none;
            border-radius: 25px;
            border: none;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1;
            overflow: hidden;
          }

          .bubbleeffectbtn:before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0)
            );
            transform: rotate(45deg);
            transition: all 0.5s ease;
            z-index: -1;
          }

          .bubbleeffectbtn:hover:before {
            top: -100%;
            left: -100%;
          }

          .bubbleeffectbtn:after {
            border-radius: 25px;
            position: absolute;
            content: '';
            width: 0;
            height: 100%;
            top: 0;
            z-index: -1;
            box-shadow:
              inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
              7px 7px 20px 0px rgba(0, 0, 0, 0.1),
              4px 4px 5px 0px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            background: linear-gradient(45deg, var(--secondary), var(--primary));
            right: 0;
          }

          .bubbleeffectbtn:hover:after {
            width: 100%;
            left: 0;
          }

          .bubbleeffectbtn:active {
            top: 2px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            background: linear-gradient(45deg, var(--primary), var(--secondary));
          }

          .bubbleeffectbtn span {
            position: relative;
            z-index: 2;
          }
        `}</style>

        <span className="text-sm font-medium">{children}</span>
      </button>
    </div>
  );
}

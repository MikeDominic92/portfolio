"use client";

import { motion } from 'framer-motion';
import { Calendar, Terminal } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useHover } from '../context/HoverContext';

const Experience = () => {
    const { setIsHovered } = useHover();

    const experiences = [
        {
            title: "Threat & Vulnerability Management Engineer",
            company: "AlgOPro Solutions",
            period: "Jan 2024 to Present",
            responsibilities: [
                "Enforce Least Privilege access models using SailPoint IdentityIQ for access certifications and AWS IAM Access Analyzer to identify overly permissive policies across hybrid infrastructure.",
                "Configure Identity Threat Detection and Response (ITDR) rules in CrowdStrike Falcon to detect compromised credentials, impossible travel anomalies, and lateral movement patterns.",
                "Prioritize vulnerability remediation using Tenable.io and Qualys by correlating CVE data with identity exposure, focusing on assets with privileged access or service accounts.",
                "Investigate access-related incidents using Splunk queries to correlate CloudTrail logs, Azure AD sign-in logs, and Active Directory event logs for root cause analysis."
            ],
            tech: ["SailPoint", "AWS IAM", "CrowdStrike", "Tenable", "Splunk"]
        },
        {
            title: "Cloud Security Engineer",
            company: "AlgOPro Solutions",
            period: "Jan 2022 to Dec 2023",
            responsibilities: [
                "Built automated user provisioning and deprovisioning workflows using Python and Boto3, integrating with AWS IAM and Azure AD via Microsoft Graph API for JML lifecycle management.",
                "Analyzed IAM policies using AWS IAM Access Analyzer and Policy Simulator to identify cross-account trust misconfigurations and excessive wildcard permissions.",
                "Integrated AWS CloudTrail and VPC Flow Logs with Splunk SIEM, building dashboards to monitor IAM role assumptions, access key usage, and privilege escalation attempts.",
                "Implemented infrastructure as code security using Terraform with Checkov policies to enforce IAM guardrails in CI/CD pipelines."
            ],
            tech: ["Python", "Boto3", "Graph API", "Terraform", "Splunk"]
        },
        {
            title: "Cloud Support Engineer",
            company: "Amazon Web Services (AWS)",
            period: "Jan 2021 to Dec 2021",
            responsibilities: [
                "Resolved cross-account role assumption failures using IAM Policy Simulator and CloudTrail, diagnosing trust policy misconfigurations and implicit denies from SCPs in AWS Organizations.",
                "Troubleshot Service Control Policy (SCP) conflicts using AWS Organizations console and CLI, helping enterprise customers implement region restrictions and service guardrails.",
                "Debugged Lambda-based credential rotation scripts written in Python/Boto3 that triggered GuardDuty findings, identifying issues with Secrets Manager integration and IAM permissions.",
                "Diagnosed VPC Endpoint and PrivateLink connectivity issues using VPC Flow Logs and CloudWatch, restoring S3 and EC2 access while maintaining Zero Trust network segmentation."
            ],
            tech: ["AWS IAM", "SCPs", "Lambda", "VPC", "CloudWatch"]
        },
        {
            title: "Technical Lead & Co-Owner",
            company: "Pho House & Hong Thanh",
            period: "May 2014 to Apr 2020",
            responsibilities: [
                "Implemented PCI-DSS compliant access controls using Active Directory group policies for POS system authentication and role-based permissions for payment processing.",
                "Migrated on-premises infrastructure to AWS and GCP, configuring IAM roles, service accounts, and VPC security groups for secure multi-cloud operations.",
                "Built custom iOS Point of Sale application using Swift with Python backend APIs, implementing OAuth 2.0 authentication and encrypted credential storage."
            ],
            tech: ["Active Directory", "AWS", "GCP", "Swift", "OAuth 2.0"]
        },

    ];

    return (
        <section id="experience" className="py-12 relative overflow-hidden font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-terminal-green">root@iam:~/logs#</span>
                        <span className="text-white">tail -f experience_history.log</span>
                    </h2>
                    <div className="h-px w-full bg-white/10 mb-6"></div>
                </motion.div>

                <div className="relative border-l border-white/10 ml-4 md:ml-10 pl-8 md:pl-12 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Timeline Node */}
                            <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 bg-black border border-terminal-green rounded-full flex items-center justify-center z-10">
                                <div className="w-1.5 h-1.5 bg-terminal-green rounded-full"></div>
                            </div>

                            <div className="bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-terminal-green/30 transition-colors">
                                {/* Log Header */}
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 text-xs text-white border-b border-white/5 pb-2">
                                    <span className="text-terminal-green">[{exp.period}]</span>
                                    <span className="hidden md:inline">|</span>
                                    <span className="text-white">PID: {2024 - index}</span>
                                    <span className="hidden md:inline">|</span>
                                    <span className="text-[#39FF14]">STATUS: COMPLETED</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">
                                    <span className="text-terminal-green mr-2">&gt;</span>
                                    {exp.title}
                                </h3>
                                <div className="text-terminal-green text-sm mb-6">@ {exp.company}</div>

                                {/* Log Content */}
                                <div className="space-y-3 text-sm text-white leading-relaxed">
                                    {exp.responsibilities.map((resp, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span className="text-terminal-green shrink-0 font-mono text-xs mt-1">{`>`}</span>
                                            <span>{resp}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Stack Array */}
                                <div className="mt-6 pt-4 border-t border-white/5 text-xs">
                                    <span className="text-[#D000FF]">const</span> <span className="text-white">tech_stack</span> = <span className="text-white">[</span>
                                    {exp.tech.map((tech, idx) => (
                                        <span key={idx} className="text-[#39FF14]">
                                            "{tech}"{idx < exp.tech.length - 1 ? <span className="text-white">, </span> : ''}
                                        </span>
                                    ))}
                                    <span className="text-white">];</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Experience;

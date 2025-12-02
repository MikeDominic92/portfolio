"use client";

import { motion } from 'framer-motion';
import { Folder, GitBranch, Shield, Terminal, ExternalLink, Server } from 'lucide-react';
import { useHover } from '../context/HoverContext';
import { useState } from 'react';
import CaseStudyModal from './CaseStudyModal';

const Projects = () => {
    const { setIsHovered } = useHover();
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const projects = [
        {
            title: "ZeroTrust-IAM-Analyzer",
            category: "Identity Security",
            status: "DEPLOYED",
            description: "Deployed internal application behind Google Cloud IAP with Context-Aware Access policies. Configured device trust levels using Endpoint Verification, geo-location restrictions via Access Context Manager, and integrated with Cloud Identity for group-based access control.",
            challenge: "The organization needed to expose internal tools to remote employees without using a VPN, which was causing latency and support tickets. Traditional IP whitelisting was insufficient for a distributed workforce.",
            solution: "Implemented a Zero Trust architecture using GCP IAP. We replaced the VPN with identity-based access control. Users authenticate via their corporate identity, and access is granted only if their device meets security posture checks (OS version, disk encryption) and they are in an allowed geographic region.",
            architecture: [
                "User Request",
                "Cloud Load Balancer",
                "Identity-Aware Proxy (AuthZ)",
                "Context-Aware Access (Policy)",
                "Internal App (Cloud Run)"
            ],
            tech: ["GCP IAP", "Context-Aware Access", "Cloud Identity", "Python"],
            githubUrl: "https://github.com/MikeDominic92/ZeroTrust-IAM-Analyzer"
        },
        {
            title: "IAM Immune System",
            category: "Security Automation",
            status: "ACTIVE",
            description: "Built Python-based Cloud Function triggered by Eventarc that monitors for dangerous IAM changes and auto-reverts them within seconds. Integrated with Vertex AI for anomaly detection and predictive access risk scoring.",
            challenge: "Developers were accidentally creating over-permissive IAM roles and public storage buckets in development environments, creating significant security risks that manual audits missed for days.",
            solution: "Built an event-driven 'immune system'. When a high-risk IAM change event is logged in Cloud Audit Logs, Eventarc triggers a Cloud Function. This function analyzes the change against a policy baseline. If a violation is found (e.g., 'Storage Object Viewer' granted to 'allUsers'), it immediately reverts the change and notifies the security team via Slack.",
            architecture: [
                "IAM Change Event",
                "Cloud Audit Logs",
                "Eventarc Trigger",
                "Remediation Function",
                "Slack Notification"
            ],
            tech: ["Python", "Eventarc", "Cloud Functions", "Vertex AI"],
            githubUrl: "https://github.com/MikeDominic92/iam-immune-system"
        },
        {
            title: "Keyless Kingdom",
            category: "DevSecOps",
            status: "PRODUCTION",
            description: "Configured GitHub Actions OIDC provider with GCP Workload Identity Federation to exchange JWT tokens for short-lived service account credentials. Terraform deploys infrastructure without long-lived keys.",
            challenge: "Managing long-lived Service Account JSON keys for CI/CD pipelines was a security nightmare. Keys were often leaked in git history or left rotating on developer machines.",
            solution: "Eliminated long-lived keys entirely using Workload Identity Federation. GitHub Actions now exchanges its OIDC token for a short-lived Google Cloud access token. This means there are no secrets to manage or leak. Access is granted based on the specific GitHub repository and branch.",
            architecture: [
                "GitHub Action Trigger",
                "OIDC Token Exchange",
                "Workload Identity Pool",
                "Short-lived Access Token",
                "Terraform Apply"
            ],
            tech: ["OIDC", "GitHub Actions", "Terraform", "GCP"],
            githubUrl: "https://github.com/MikeDominic92/keyless-kingdom"
        },
        {
            title: "PAM Vault Lab",
            category: "Privileged Access Management",
            status: "LAB",
            description: "Built privileged access management lab using CyberArk and HashiCorp Vault to secure service accounts and admin credentials. Implemented credential rotation, session recording, and just-in-time access.",
            challenge: "Demonstrating control over privileged credentials and auditing access to critical systems.",
            solution: "Deployed a dual-vault architecture. CyberArk handles human privileged access with session recording, while HashiCorp Vault manages dynamic secrets for applications. Implemented automatic password rotation every 24 hours.",
            architecture: [
                "User Request",
                "CyberArk PVWA",
                "CPM (Rotation)",
                "PSM (Session)",
                "Target System"
            ],
            tech: ["CyberArk", "HashiCorp Vault", "PAM"],
            githubUrl: "https://github.com/MikeDominic92/pam-vault-lab"
        },
        {
            title: "Okta SSO Hub",
            category: "Multi-App Federation",
            status: "LAB",
            description: "Configured Okta as central identity provider with SAML and OIDC integrations. Implemented SCIM provisioning for automatic user sync and adaptive MFA policies using Okta Workflows.",
            challenge: "Unifying identity across disparate SaaS applications and enforcing consistent security policies.",
            solution: "Centralized authentication via Okta. Configured SAML for legacy apps and OIDC for modern apps. Enabled SCIM to automatically provision/deprovision users in downstream apps based on AD group membership.",
            architecture: [
                "User Login",
                "Okta Auth Policy",
                "MFA Challenge",
                "SAML Assertion",
                "Service Provider"
            ],
            tech: ["Okta", "SAML", "OIDC", "SCIM"],
            githubUrl: "https://github.com/MikeDominic92/okta-sso-hub"
        },
        {
            title: "AI Access Sentinel",
            category: "ML-Powered Anomaly Detection",
            status: "LAB",
            description: "Built machine learning pipeline using Python and scikit-learn to detect anomalous access patterns in Azure AD sign-in logs. Integrated with Logic Apps for automated conditional access enforcement.",
            challenge: "Static rules-based detection was missing subtle indicators of compromise in authentication logs.",
            solution: "Developed an ML model to establish a baseline of 'normal' user behavior (location, time, device). Deviations trigger a Logic App that temporarily disables the user account and alerts the SOC.",
            architecture: [
                "Azure AD Logs",
                "Event Hub",
                "ML Model (Python)",
                "Anomaly Score",
                "Logic App Block"
            ],
            tech: ["Python", "scikit-learn", "Azure AD", "Logic Apps"],
            githubUrl: "https://github.com/MikeDominic92/ai-access-sentinel"
        }
    ];

    return (
        <section id="projects" className="py-20 relative overflow-hidden font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-terminal-green">root@iam:~/projects#</span>
                        <span className="text-white">ls -la ./featured_builds</span>
                    </h2>
                    <div className="h-px w-full bg-white/10 mb-6"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative cursor-pointer"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onDoubleClick={() => window.open(project.githubUrl, '_blank')}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-terminal-green/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                            <div className="relative h-full bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-lg flex flex-col">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-terminal-green/10 rounded-md border border-terminal-green/20">
                                        <Shield className="w-6 h-6 text-terminal-green" />
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-white/60 border border-white/10">
                                        {project.status}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-terminal-green transition-colors">
                                    {project.title}
                                </h3>
                                <div className="text-xs text-terminal-green mb-4 font-mono">
                                    &lt;{project.category} /&gt;
                                </div>

                                {/* Description */}
                                <p className="text-sm text-white/70 mb-6 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                {/* Architecture List */}
                                <div className="mb-6 space-y-2">
                                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Architecture</div>
                                    {project.architecture.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                                            <GitBranch className="w-3 h-3 text-terminal-green/50" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Stack */}
                                <div className="flex gap-2 mb-4">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/40 border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="flex items-center gap-2 text-sm text-white hover:text-terminal-green transition-colors group/btn"
                                    >
                                        <Server className="w-4 h-4" />
                                        <span>View Architecture</span>
                                    </button>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/20 hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <CaseStudyModal
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                    project={selectedProject}
                />
            </div>
        </section>
    );
};

export default Projects;

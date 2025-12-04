"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Folder, GitBranch, Shield, Terminal, ExternalLink, Server, ImageIcon } from 'lucide-react';
import { useHover } from '../context/HoverContext';
import { useState, useEffect } from 'react';
import CaseStudyModal from './CaseStudyModal';

const Projects = () => {
    const { setIsHovered } = useHover();
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

    // Slideshow effect on hover
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (hoveredProjectIndex !== null) {
            interval = setInterval(() => {
                setCurrentScreenshotIndex(prev => {
                    const project = projects[hoveredProjectIndex];
                    return (prev + 1) % (project.screenshots?.length || 1);
                });
            }, 2000);
        } else {
            setCurrentScreenshotIndex(0);
        }
        return () => clearInterval(interval);
    }, [hoveredProjectIndex]);

    const projects = [
        {
            title: "ZeroTrust IAM Analyzer",
            category: "Multi-Cloud CIEM",
            status: "v1.1",
            description: "Enterprise CIEM platform analyzing cloud entitlements across GCP and AWS. Features AWS IAM Access Analyzer integration for external access detection, Zero Trust scoring, and least-privilege recommendations with ML-based risk quantification.",
            challenge: "99% of cloud permissions granted are never used (Gartner 2024). Organizations struggle to visualize effective permissions across multiple clouds and detect privilege escalation paths before breaches occur.",
            solution: "Built multi-cloud CIEM solution with AWS IAM Access Analyzer integration. Scans GCP IAM and AWS IAM to identify excessive permissions, external access exposure, and privilege escalation paths. Generates 0-100 risk scores with actionable remediation recommendations.",
            architecture: [
                "GCP Cloud IAM + AWS IAM Access Analyzer",
                "FastAPI Analysis Engine",
                "ML Risk Scorer (0-100)",
                "React Dashboard",
                "PostgreSQL + Compliance Reports"
            ],
            tech: ["Python", "FastAPI", "AWS boto3", "GCP IAM", "React"],
            githubUrl: "https://github.com/MikeDominic92/ZeroTrust-IAM-Analyzer",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/ZeroTrust-IAM-Analyzer/master/docs/screenshots/dashboard_page_1764612726130.png",
                "https://raw.githubusercontent.com/MikeDominic92/ZeroTrust-IAM-Analyzer/master/docs/screenshots/identity_page_1764612733500.png",
                "https://raw.githubusercontent.com/MikeDominic92/ZeroTrust-IAM-Analyzer/master/docs/screenshots/risk_page_1764612751598.png",
                "https://raw.githubusercontent.com/MikeDominic92/ZeroTrust-IAM-Analyzer/master/docs/screenshots/recommendations_page_1764612760211.png"
            ]
        },
        {
            title: "IAM Immune System",
            category: "Security Automation + IGA",
            status: "v1.1",
            description: "Event-driven security automation with SailPoint IdentityIQ integration. Monitors GCP IAM changes in real-time, auto-remediates threats using ML anomaly detection, and correlates with identity lifecycle events (Joiner/Mover/Leaver).",
            challenge: "Cloud IAM changes happen faster than security teams can react. Manual review cannot detect threats in real-time or correlate with identity governance systems.",
            solution: "Built event-driven 'immune system' with SailPoint IGA integration. Eventarc triggers Cloud Functions on IAM changes, Isolation Forest ML detects anomalies, and auto-remediation reverts dangerous changes within seconds. SailPoint webhooks correlate with lifecycle events.",
            architecture: [
                "GCP Eventarc + Cloud Audit Logs",
                "Cloud Functions (Python)",
                "Isolation Forest ML Anomaly Detection",
                "SailPoint IdentityIQ Webhooks",
                "Slack/Teams Alerting"
            ],
            tech: ["Python", "GCP", "Terraform", "SailPoint IIQ", "ML"],
            githubUrl: "https://github.com/MikeDominic92/iam-immune-system",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/iam-immune-system/master/docs/screenshots/immune_dashboard_verification_1764616411409.png",
                "https://raw.githubusercontent.com/MikeDominic92/iam-immune-system/master/docs/screenshots/detection_center_verification_1764616434845.png",
                "https://raw.githubusercontent.com/MikeDominic92/iam-immune-system/master/docs/screenshots/remediation_console_verification_1764616456695.png",
                "https://raw.githubusercontent.com/MikeDominic92/iam-immune-system/master/docs/screenshots/identity_monitor_verification_1764616478951.png",
                "https://raw.githubusercontent.com/MikeDominic92/iam-immune-system/master/docs/screenshots/alert_management_verification_1764616502614.png"
            ]
        },
        {
            title: "Entra ID Governance",
            category: "Microsoft IAM + SIEM",
            status: "v1.1",
            description: "Microsoft Entra ID governance automation with Splunk SIEM integration. Analyzes Conditional Access policies, monitors PIM activations, automates Access Reviews, and forwards identity events to Splunk for SOC correlation.",
            challenge: "Enterprise Microsoft environments accumulate 100+ Conditional Access policies with conflicts and gaps. SOC teams lack identity context in SIEM during incident response.",
            solution: "Built governance toolkit with Splunk HEC integration. Analyzes CA policies for MFA gaps and conflicts, monitors PIM for standing access violations, automates Access Reviews at scale, and forwards all identity events to Splunk in CIM format for real-time SOC correlation.",
            architecture: [
                "Microsoft Graph API + MSAL",
                "CA Policy Analyzer",
                "PIM Monitoring Engine",
                "Splunk HEC Event Forwarder",
                "React Governance Dashboard"
            ],
            tech: ["Python", "FastAPI", "Graph API", "Splunk HEC", "PowerShell"],
            githubUrl: "https://github.com/MikeDominic92/entra-id-governance",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/entra-id-governance/master/docs/screenshots/dashboard_verification_1764615323909.png",
                "https://raw.githubusercontent.com/MikeDominic92/entra-id-governance/master/docs/screenshots/conditional_access_verification_1764615338655.png",
                "https://raw.githubusercontent.com/MikeDominic92/entra-id-governance/master/docs/screenshots/pim_verification_1764615355559.png",
                "https://raw.githubusercontent.com/MikeDominic92/entra-id-governance/master/docs/screenshots/access_reviews_verification_1764615372795.png",
                "https://raw.githubusercontent.com/MikeDominic92/entra-id-governance/master/docs/screenshots/compliance_verification_1764615388733.png"
            ]
        },
        {
            title: "Okta SSO Hub",
            category: "SSO + Workflows Automation",
            status: "v1.1",
            description: "Enterprise SSO platform with Okta Workflows automation. Implements SAML 2.0 and OIDC/OAuth 2.0 federation, SCIM 2.0 provisioning, and event-driven identity lifecycle automation using Okta Workflows API.",
            challenge: "SSO implementation requires multiple protocols (SAML vs OIDC), provisioning takes days, and manual workflows slow down access requests. Organizations need hands-on protocol expertise.",
            solution: "Built complete SSO hub with Okta Workflows integration. Flask SAML SP for enterprise apps, React OIDC SPA for modern apps, SCIM for automated provisioning, and Workflows API for event-driven lifecycle automation (user created, group change, password reset).",
            architecture: [
                "Okta Universal Directory",
                "SAML 2.0 + OIDC/OAuth 2.0",
                "SCIM 2.0 Provisioning",
                "Okta Workflows Engine",
                "Flask SP + React SPA + Node API"
            ],
            tech: ["Okta", "SAML", "OIDC", "SCIM", "Python", "React"],
            githubUrl: "https://github.com/MikeDominic92/okta-sso-hub",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/okta-sso-hub/master/docs/screenshots/okta_dashboard_1764620382675.png",
                "https://raw.githubusercontent.com/MikeDominic92/okta-sso-hub/master/docs/screenshots/okta_apps_1764620414608.png",
                "https://raw.githubusercontent.com/MikeDominic92/okta-sso-hub/master/docs/screenshots/okta_federation_1764620443193.png",
                "https://raw.githubusercontent.com/MikeDominic92/okta-sso-hub/master/docs/screenshots/okta_security_1764620475111.png",
                "https://raw.githubusercontent.com/MikeDominic92/okta-sso-hub/master/docs/screenshots/okta_provisioning_1764620505660.png"
            ]
        },
        {
            title: "AI Access Sentinel",
            category: "ML-Powered IAM Decisions",
            status: "v1.1",
            description: "ML-powered access decision engine with CrowdStrike Falcon ITDR integration. Uses 6-factor risk scoring combining identity behavior, device posture, and threat intelligence to make intelligent approve/deny/step-up decisions.",
            challenge: "Static RBAC cannot adapt to dynamic risk. 74% of breaches involve compromised credentials that pass traditional authentication checks.",
            solution: "Built ML decision engine with CrowdStrike Falcon integration. 6-factor scoring evaluates: identity risk, device risk, network risk, behavior anomaly, resource sensitivity, and threat intelligence. CrowdStrike provides real-time identity threat context for step-up authentication decisions.",
            architecture: [
                "Access Request Ingestion",
                "6-Factor ML Risk Engine",
                "CrowdStrike Falcon ITDR API",
                "Decision Engine (Approve/Deny/Step-up)",
                "Streamlit Analytics Dashboard"
            ],
            tech: ["Python", "scikit-learn", "CrowdStrike Falcon", "FastAPI", "Streamlit"],
            githubUrl: "https://github.com/MikeDominic92/ai-access-sentinel",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/ai-access-sentinel/master/docs/screenshots/sentinel_dashboard_1764609805498.png",
                "https://raw.githubusercontent.com/MikeDominic92/ai-access-sentinel/master/docs/screenshots/sentinel_decisions_1764609844410.png",
                "https://raw.githubusercontent.com/MikeDominic92/ai-access-sentinel/master/docs/screenshots/sentinel_analytics_1764609878554.png",
                "https://raw.githubusercontent.com/MikeDominic92/ai-access-sentinel/master/docs/screenshots/sentinel_threats_1764609911889.png",
                "https://raw.githubusercontent.com/MikeDominic92/ai-access-sentinel/master/docs/screenshots/sentinel_config_1764609943752.png"
            ]
        },
        {
            title: "PAM Vault Lab",
            category: "PAM + Cloud Secrets",
            status: "v1.1",
            description: "Enterprise PAM practice environment with AWS Secrets Manager sync. HashiCorp Vault for secrets management, dynamic credentials, password rotation, with bidirectional AWS cloud synchronization. Aligned with CyberArk PAM-DEF concepts.",
            challenge: "CyberArk licensing costs $50K+ annually. PAM professionals need hands-on practice with enterprise patterns but lack affordable lab environments.",
            solution: "Built production-ready PAM lab with AWS Secrets Manager integration. Vault KV v2 for secrets, Database Secrets Engine for dynamic credentials, rotation automation, and bidirectional sync to AWS Secrets Manager for hybrid cloud scenarios. Zero cost vs enterprise PAM.",
            architecture: [
                "HashiCorp Vault Server",
                "Database Secrets Engine (PostgreSQL/MySQL)",
                "AWS Secrets Manager Sync",
                "Rotation Event Handler",
                "Prometheus + Grafana Monitoring"
            ],
            tech: ["HashiCorp Vault", "AWS Secrets Manager", "Docker", "Python", "Ansible"],
            githubUrl: "https://github.com/MikeDominic92/pam-vault-lab",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/pam-vault-lab/master/docs/screenshots/vault_dashboard_1764618915895.png",
                "https://raw.githubusercontent.com/MikeDominic92/pam-vault-lab/master/docs/screenshots/vault_secrets_1764618939082.png",
                "https://raw.githubusercontent.com/MikeDominic92/pam-vault-lab/master/docs/screenshots/vault_creds_1764618961178.png",
                "https://raw.githubusercontent.com/MikeDominic92/pam-vault-lab/master/docs/screenshots/vault_pki_1764618983762.png",
                "https://raw.githubusercontent.com/MikeDominic92/pam-vault-lab/master/docs/screenshots/vault_audit_1764619004996.png"
            ]
        },
        {
            title: "Keyless Kingdom",
            category: "DevSecOps Zero Trust",
            status: "PRODUCTION",
            description: "Eliminated long-lived service account keys using Workload Identity Federation. GitHub Actions OIDC provider exchanges JWT tokens for short-lived GCP credentials. Terraform deploys infrastructure with zero secrets to manage.",
            challenge: "Managing long-lived Service Account JSON keys for CI/CD pipelines was a security nightmare. Keys were often leaked in git history or left on developer machines.",
            solution: "Eliminated long-lived keys entirely using Workload Identity Federation. GitHub Actions exchanges its OIDC token for short-lived Google Cloud access tokens. No secrets to manage or leak. Access granted based on specific repository and branch.",
            architecture: [
                "GitHub Action OIDC Token",
                "GCP Workload Identity Pool",
                "Token Exchange Service",
                "Short-lived Access Token",
                "Terraform Infrastructure Deploy"
            ],
            tech: ["OIDC", "GitHub Actions", "Terraform", "GCP WIF"],
            githubUrl: "https://github.com/MikeDominic92/keyless-kingdom",
            screenshots: [
                "https://raw.githubusercontent.com/MikeDominic92/keyless-kingdom/master/docs/screenshots/dashboard_1764617804714.png",
                "https://raw.githubusercontent.com/MikeDominic92/keyless-kingdom/master/docs/screenshots/config_1764617824746.png",
                "https://raw.githubusercontent.com/MikeDominic92/keyless-kingdom/master/docs/screenshots/workflow_1764617844598.png",
                "https://raw.githubusercontent.com/MikeDominic92/keyless-kingdom/master/docs/screenshots/audit_1764617864177.png",
                "https://raw.githubusercontent.com/MikeDominic92/keyless-kingdom/master/docs/screenshots/architecture_1764617886966.png"
            ]
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
                            onMouseEnter={() => {
                                setIsHovered(true);
                                setHoveredProjectIndex(index);
                            }}
                            onMouseLeave={() => {
                                setIsHovered(false);
                                setHoveredProjectIndex(null);
                            }}
                            onDoubleClick={() => window.open(project.githubUrl, '_blank')}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-terminal-green/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                            <div className="relative h-full bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-lg flex flex-col overflow-hidden">
                                {/* Background Slideshow */}
                                <AnimatePresence mode="wait">
                                    {hoveredProjectIndex === index && project.screenshots && project.screenshots.length > 0 && (
                                        <motion.div
                                            key={currentScreenshotIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.15 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 z-0"
                                        >
                                            <img
                                                src={project.screenshots[currentScreenshotIndex]}
                                                alt="Project Screenshot"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full">
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
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/40 border border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            onDoubleClick={(e) => {
                                                e.stopPropagation(); // Prevent card double-click
                                                setSelectedProject({ ...project, showScreenshots: true });
                                            }}
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
